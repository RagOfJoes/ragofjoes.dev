export type Token = TokenGallery | TokenLink | TokenStrong | TokenText;

export type TokenGallery = {
	type: "gallery";

	key: string;
	children: Token[];
};

export type TokenLink = {
	type: "link";

	href: string;
	children: Token[];
};

export type TokenStrong = {
	type: "strong";

	children: Token[];
};

export type TokenText = {
	type: "text";

	text: string;
};

export class Parser {
	#position: number;
	#src: string;

	constructor(src: string) {
		this.#position = 0;
		this.#src = src;
	}

	parse(): Token[] {
		return this.#parseInline();
	}

	#parseInline(stopBefore?: string): Token[] {
		let buffer = "";
		const tokens: Token[] = [];

		const flush = () => {
			if (!buffer) {
				return;
			}

			const text: TokenText = {
				type: "text",

				text: buffer,
			};
			tokens.push(text);
			buffer = "";
		};

		while (this.#position < this.#src.length) {
			if (stopBefore && this.#src.startsWith(stopBefore, this.#position)) {
				break;
			}

			const current = this.#src[this.#position];
			const next = this.#src[this.#position + 1];

			// Link
			if (current === "[") {
				flush();

				const token = this.#parseLink();
				if (!token) {
					buffer += "[";
					this.#position += 1;
				} else {
					tokens.push(token);
				}

				continue;
			}
			// Strong
			if (current === "*" && next === "*") {
				flush();

				const token = this.#parseStrong();
				if (!token) {
					buffer += "**";
					this.#position += 2;
				} else {
					tokens.push(token);
				}

				continue;
			}

			buffer += current;
			this.#position += 1;
		}

		flush();
		return tokens;
	}

	// Individual token parsers
	//

	#parseLink(): TokenGallery | TokenLink | null {
		const start = this.#position;
		// Skip starting `[`
		this.#position += 1;

		// Could not find closing delimiter so rewind
		const closingBracket = this.#findClosingDelimeter("[", "]");
		if (closingBracket === -1) {
			this.#position = start;
			return null;
		}

		// Could not find closing delimiter so rewind
		const children = this.#parseInline("]");
		if (this.#src[this.#position] !== "]") {
			this.#position = start;
			return null;
		}

		// Skip closing `]`
		this.#position += 1;

		// Search for URL
		if (this.#src[this.#position] != "(") {
			this.#position = start;
			return null;
		}

		// Skip starting `(`
		this.#position += 1;

		// Could not find closing delimiter so rewind
		const closingParenthesis = this.#findClosingDelimeter("(", ")");
		if (closingParenthesis === -1) {
			this.#position = start;
			return null;
		}

		const href = this.#src.slice(this.#position, closingParenthesis).trim();

		// Skip text inside parenthesis and closing `)`
		this.#position = closingParenthesis + 1;

		if (href.startsWith("gallery:")) {
			return {
				type: "gallery",

				// Strip gallery:
				key: href.slice(8),
				children,
			};
		}

		return {
			type: "link",

			href,
			children,
		};
	}

	#parseStrong(): TokenStrong | null {
		const start = this.#position;
		// Skip starting `**`
		this.#position += 2;

		// Ensure there's actually closers
		if (!this.#src.includes("**", this.#position)) {
			this.#position = start;
			return null;
		}

		// Could not find closing delimiter so rewind
		const children = this.#parseInline("**");
		if (!this.#src.startsWith("**", this.#position)) {
			this.#position = start;
			return null;
		}

		this.#position += 2;
		return {
			type: "strong",

			children,
		};
	}

	// Helpers
	//

	#findClosingDelimeter(start: string, end: string): number {
		let index = this.#position;
		const stack: string[] = [start];
		while (index < this.#src.length && stack.length > 0) {
			if (this.#src[index] === start) {
				stack.push(start);
			}
			if (this.#src[index] === end) {
				stack.pop();
			}
			if (stack.length > 0) {
				index += 1;
			}
		}

		return stack.length === 0 ? index : -1;
	}
}
