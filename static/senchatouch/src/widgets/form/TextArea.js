/**
 * @class Ext.form.TextArea
 * @extends Ext.form.Field
 * <p>Wraps a textarea. See {@link Ext.form.FormPanel FormPanel} for example usage.</p>
 * @xtype textarea
 */
Ext.form.TextArea = Ext.extend(Ext.form.TextField, {
    maskField: Ext.platform.isIPhoneOS,
    
    /**
     * @cfg {Integer} maxRows The maximum number of lines made visible by the input. 
     */
    maxRows  : undefined,
    
    autoCapitalize : false,
    
    renderTpl: [
        '<div <tpl if="id">id="{id}" </tpl>class="{baseCls} {cls} {cmpCls}<tpl if="ui"> {uiBase}-{ui}</tpl> <tpl if="label">{labelAlign}</tpl>" <tpl if="style"> style="{style}"</tpl>>',
            '<tpl if="label"><label <tpl if="fieldEl">for="{inputId}"</tpl>>{label}</label></tpl>',
            '<tpl if="fieldEl"><textarea id="{inputId}" type="{type}" name="{name}" class="{fieldCls}"',
                '<tpl if="tabIndex">tabIndex="{tabIndex}" </tpl>',
                '<tpl if="placeholder">placeholder="{placeholder}" </tpl>',
                '<tpl if="style">style="{style}" </tpl>',
                '<tpl if="maxRows != undefined">rows="{maxRows}" </tpl>',
                '<tpl if="maxlength != undefined">maxlength="{maxlength}" </tpl>',
                '<tpl if="autoComplete">autocomplete="{autoComplete}" </tpl>',
                '<tpl if="autoCapitalize">autocapitalize="{autoCapitalize}" </tpl>',
            '></textarea></tpl>',
            '<tpl if="showClear"><div class="x-field-clear x-hidden-display"></div></tpl>',
            '<tpl if="maskField"><div class="x-field-mask"></div></tpl>',
        '</div>'
    ],
    
    ui: 'textarea',
    
    // @private
    onRender : function(ct, position) {
        this.renderData.maxRows = this.maxRows;
        Ext.form.TextArea.superclass.onRender.call(this, ct, position);
    }
});

Ext.reg('textarea', Ext.form.TextArea);
