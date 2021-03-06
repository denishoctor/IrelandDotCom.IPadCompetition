/**
 * @class Ext.data.JsonReader
 * @extends Ext.data.Reader
 * <p>Data reader class to create an Array of {@link Ext.data.Model} objects from a 
 * JSON packet based on mappings in a provided Ext.data.Model constructor.</p>
 * <p>Example code:</p>
<pre><code>
var myReader = new Ext.data.Store({
    proxy: {
        type: 'ajax',
        reader: {
            type: 'json',
            // metadata configuration options:
            idProperty: 'id'
            root: 'rows',
            totalProperty: 'results'
        }
    },
    
    // the fields config option will internally create an Ext.data.Model
    // constructor that provides mapping for reading the record data objects
    fields: [
        // map Record's 'firstname' field to data object's key of same name
        {name: 'name'},
        // map Record's 'job' field to data object's 'occupation' key
        {name: 'job', mapping: 'occupation'}
    ],
});
</code></pre>
 * <p>This would consume a JSON data object of the form:</p>
<pre><code>
{
    results: 2000, // Reader's configured totalProperty
    rows: [        // Reader's configured root
        // record data objects:
        { id: 1, firstname: 'Bill', occupation: 'Gardener' },
        { id: 2, firstname: 'Ben' , occupation: 'Horticulturalist' },
        ...
    ]
}
</code></pre>
 */
Ext.data.JsonReader = Ext.extend(Ext.data.Reader, {

    /**
     * Reads a JSON object and returns a ResultSet. Uses the internal getTotal and getSuccess extractors to
     * retrieve meta data from the response, and extractData to turn the JSON data into model instances.
     * @param {Object} data The raw JSON data
     * @return {Ext.data.ResultSet} A ResultSet containing model instances and meta data about the results
     */
    readRecords: function(data) {
        //this has to be before the call to super because we use the meta data in the superclass readRecords
        if (data.metaData) {
            this.onMetaChange(data.metaData);
        }
        
        /**
         * DEPRECATED - will be removed in Ext JS 5.0. This is just a copy of this.rawData - use that instead
         * @property jsonData
         * @type Mixed
         */
        this.jsonData = data;
        
        return Ext.data.JsonReader.superclass.readRecords.call(this, data);
    },
    
    //inherit docs
    getResponseData: function(response) {
        var data = Ext.decode(response.responseText);
        
        if (!data) {
            throw {message: 'Ext.data.JsonReader.read: Json object not found'};
        }
        
        return data;
    },
    
    //inherit docs
    buildExtractors : function() {
        Ext.data.JsonReader.superclass.buildExtractors.apply(this, arguments);
        
        if (this.root) {
            this.getRoot = this.createAccessor(this.root);
        } else {
            this.getRoot = function(root) {
                return root;
            };
        }
    },
    
    /**
     * @private
     * Returns an accessor function for the given property string. Gives support for properties such as the following:
     * 'someProperty'
     * 'some.property'
     * 'some["property"]'
     * This is used by buildExtractors to create optimized extractor functions when casting raw data into model instances.
     */
    createAccessor : function() {
        var re = /[\[\.]/;
        
        return function(expr) {
            if (Ext.isEmpty(expr)) {
                return Ext.emptyFn;
            }
            if (Ext.isFunction(expr)) {
                return expr;
            }
            var i = String(expr).search(re);
            if (i >= 0) {
                return new Function('obj', 'return obj' + (i > 0 ? '.' : '') + expr);
            }
            return function(obj) {
                return obj[expr];
            };
        };
    }()
});

Ext.data.ReaderMgr.registerType('json', Ext.data.JsonReader);