/**
 * @class Ext.util.Format
 * Reusable data formatting functions
 * @singleton
 */
Ext.util.Format = function() {
    return {
        
        defaultDateFormat: 'm/d/Y',
        
        /**
         * Truncate a string and add an ellipsis ('...') to the end if it exceeds the specified length
         * @param {String} value The string to truncate
         * @param {Number} length The maximum length to allow before truncating
         * @param {Boolean} word True to try to find a common work break
         * @return {String} The converted text
         */
        ellipsis: function(value, len, word) {
            if (value && value.length > len) {
                if (word) {
                    var vs = value.substr(0, len - 2),
                    index = Math.max(vs.lastIndexOf(' '), vs.lastIndexOf('.'), vs.lastIndexOf('!'), vs.lastIndexOf('?'));
                    if (index == -1 || index < (len - 15)) {
                        return value.substr(0, len - 3) + "...";
                    } else {
                        return vs.substr(0, index) + "...";
                    }
                } else {
                    return value.substr(0, len - 3) + "...";
                }
            }
            return value;
        },

        /**
         * Convert certain characters (&, <, >, and ') to their HTML character equivalents for literal display in web pages.
         * @param {String} value The string to encode
         * @return {String} The encoded text
         */
        htmlEncode: function(value) {
            return ! value ? value: String(value).replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
        },

        /**
         * Convert certain characters (&, <, >, and ') from their HTML character equivalents.
         * @param {String} value The string to decode
         * @return {String} The decoded text
         */
        htmlDecode: function(value) {
            return ! value ? value: String(value).replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&amp;/g, "&");
        },

        /**
         * Parse a value into a formatted date using the specified format pattern.
         * @param {String/Date} value The value to format (Strings must conform to the format expected by the javascript Date object's <a href="http://www.w3schools.com/jsref/jsref_parse.asp">parse()</a> method)
         * @param {String} format (optional) Any valid date format string (defaults to 'm/d/Y')
         * @return {String} The formatted date string
         */
        date: function(v, format) {
            if (!v) {
                return "";
            }
            if (!Ext.isDate(v)) {
                v = new Date(Date.parse(v));
            }
            return v.dateFormat(format || Ext.util.Format.defaultDateFormat);
        }
    };
}();
