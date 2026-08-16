// Safe serializer for JSON-LD injected via dangerouslySetInnerHTML.
//
// JSON.stringify alone is NOT enough inside a <script> block. The HTML parser
// looks for the literal string "</script" before the JS parser ever runs, so a
// job title or description containing "</script>" ends the block early and the
// rest of the JSON is parsed as markup — a stored-XSS primitive on any field the
// backend controls. Escaping "<", ">" and "&" as unicode escapes keeps the JSON
// byte-for-byte equivalent (JSON.parse decodes < back to "<") while making
// it impossible to close the tag.
//
// U+2028 / U+2029 are escaped for the same class of reason: legal inside a JSON
// string, illegal as raw characters in a JS string literal in older parsers.
// They are built with fromCharCode so no invisible separator ever sits in this
// source file.

const LINE_SEP = String.fromCharCode(0x2028);
const PARA_SEP = String.fromCharCode(0x2029);

const UNSAFE = new RegExp(`[<>&${LINE_SEP}${PARA_SEP}]`, "g");

const ESCAPES = {
    "<": "\\u003c",
    ">": "\\u003e",
    "&": "\\u0026",
    [LINE_SEP]: "\\u2028",
    [PARA_SEP]: "\\u2029",
};

/**
 * Serialize a JSON-LD object for inline <script type="application/ld+json">.
 * @param {object|null|undefined} data
 * @returns {string} JSON text safe to place inside a script element
 */
export function serializeJsonLd(data) {
    if (data == null) return "";
    return JSON.stringify(data).replace(UNSAFE, (c) => ESCAPES[c]);
}

export default serializeJsonLd;
