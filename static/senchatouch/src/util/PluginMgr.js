/**
 * @class Ext.PluginMgr
 * <p>Provides a registry of available Plugin <i>classes</i> indexed by a mnemonic code known as the Plugin's ptype.
 * The <code>{@link Ext.Component#xtype xtype}</code> provides a way to avoid instantiating child Components
 * when creating a full, nested config object for a complete Ext page.</p>
 * <p>A child Component may be specified simply as a <i>config object</i>
 * as long as the correct <code>{@link Ext.Component#xtype xtype}</code> is specified so that if and when the Component
 * needs rendering, the correct type can be looked up for lazy instantiation.</p>
 * <p>For a list of all available <code>{@link Ext.Component#xtype xtypes}</code>, see {@link Ext.Component}.</p>
 * @singleton
 */
Ext.PluginMgr = new Ext.AbstractManager({
    typeName: 'ptype',

    /**
     * Creates a new Plugin from the specified config object using the
     * config object's {@link Ext.component#ptype ptype} to determine the class to instantiate.
     * @param {Object} config A configuration object for the Plugin you wish to create.
     * @param {Constructor} defaultType The constructor to provide the default Plugin type if
     * the config object does not contain a <code>ptype</code>. (Optional if the config contains a <code>ptype</code>).
     * @return {Ext.Component} The newly instantiated Plugin.
     */
    create : function(config, defaultType){
        var PluginCls = this.types[config.ptype || defaultType];
        if (PluginCls.init) {
            return PluginCls;
        } else {
            return new PluginCls(config);
        }
    },

    /**
     * Returns all plugins registered with the given type. Here, 'type' refers to the type of plugin, not its ptype.
     * @param {String} type The type to search for
     * @param {Boolean} defaultsOnly True to only return plugins of this type where the plugin's isDefault property is truthy
     * @return {Array} All matching plugins
     */
    findByType: function(type, defaultsOnly) {
        var matches = [],
            types   = this.types;

        for (var name in types) {
            var item = types[name];

            if (item.type == type && (defaultsOnly === true && item.isDefault)) {
                matches.push(item);
            }
        }

        return matches;
    }
});

/**
 * Shorthand for {@link Ext.PluginMgr#registerType}
 * @param {String} ptype The {@link Ext.component#ptype mnemonic string} by which the Plugin class
 * may be looked up.
 * @param {Constructor} cls The new Plugin class.
 * @member Ext
 * @method preg
 */
Ext.preg = function() {
    return Ext.PluginMgr.registerType.apply(Ext.PluginMgr, arguments);
};
