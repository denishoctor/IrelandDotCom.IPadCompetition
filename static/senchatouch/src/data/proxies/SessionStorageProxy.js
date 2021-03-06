/**
 * @class Ext.data.SessionStorageProxy
 * @extends Ext.data.WebStorageProxy
 * <p>Proxy which uses HTML5 session storage as its data storage/retrieval mechanism.
 * If this proxy is used in a browser where session storage is not supported, the constructor will throw an error. 
 * A session storage proxy requires a unique ID which is used as a key in which all record data are stored in the
 * session storage object.</p>
 * <p>It's important to supply this unique ID as it cannot be reliably determined otherwise. If no id is provided
 * but the attached store has a storeId, the storeId will be used. If neither option is presented the proxy will
 * throw an error.</p>
 * <p>Proxies are almost always used with a {@link Ext.data.Store store}:<p>
<pre><code>
new Ext.data.Store({
    proxy: {
        type: 'sessionstorage',
        id  : 'myProxyKey'
    }
});
</code></pre>
 * <p>Alternatively you can instantiate the Proxy directly:</p>
<pre><code>
new Ext.data.SessionStorageProxy({
    id  : 'myOtherProxyKey'
});
 </code></pre>
 * <p>Note that session storage is different to local storage (see {@link Ext.data.LocalStorageProxy}) - if a browser
 * session is ended (e.g. by closing the browser) then all data in a SessionStorageProxy are lost. Browser restarts
 * don't affect the {@link Ext.data.LocalStorageProxy} - the data are preserved.</p>
 */
Ext.data.SessionStorageProxy = Ext.extend(Ext.data.WebStorageProxy, {
    //inherit docs
    getStorageObject: function() {
        return sessionStorage;
    }
});

Ext.data.ProxyMgr.registerType('sessionstorage', Ext.data.SessionStorageProxy);