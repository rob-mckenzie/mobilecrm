
mobilens.orderSort = '';
mobilens.pageSize = 15;
mobilens.currentPage = 1;
mobilens.cancelButton = '';
mobilens.activeFiltersOnly = '';
mobilens.orderListHeight = 62;
mobilens.orderListSelction = 0;


/* **************************************************************** */
/*                  Target Web Service Domain Determination         */
/* **************************************************************** */

var theDomain = document.domain;
if( theDomain.substr(-7) != 'air.com')
	{ mobilens.hostname = 'https://sapecomtest.sealedair.com:443'; } // sapecomdev.sealedair.com:443'; }
else
	{ mobilens.hostname = 'https://'+theDomain+':443'; }



/* **************************************************************** */
/*                  All Application Models                               */
/* **************************************************************** */
Ext.regModel('modelMessageStore',{
	fields:[
	{name: 'msg1', type: 'string', defaultValue: ''},
	{name: 'msg2', type: 'string', defaultValue: ''},
	{name: 'msg3', type: 'string', defaultValue: ''},
	{name: 'msg4', type: 'string', defaultValue: ''},
	{name: 'msg5', type: 'string', defaultValue: ''},
	{name: 'msg6', type: 'string', defaultValue: ''},
	{name: 'msg7', type: 'string', defaultValue: ''},
	{name: 'msg8', type: 'string', defaultValue: ''},
	{name: 'msg9', type: 'string', defaultValue: ''},
	{name: 'msg10', type: 'string', defaultValue: ''}	
	]
});

Ext.regModel('modelIndexBarStore',{
    fields:[
	{name: 'key', type: 'string'},
	{name: 'value', type: 'string'},
	{name: 'filter1', type: 'string'},
	{name: 'filter2', type: 'string'},
	{name: 'filter3', type: 'string'}
	]
});







Ext.regModel('modelSystemState',{
	fields:[
	{name: 'recordType', type: 'string', defaultValue: ''},
	{name: 'primaryListSource', type: 'string', defaultValue: ''},
	{name: 'filteredShipTo', type: 'string', defaultValue: ''},
	{name: 'keyValue', type: 'string', defaultValue: ''}
	]

// create a custom function here that handles curtains and orientation changes.

});



Ext.regModel('modelSAPSoldTo',{
	fields:[
	{name: 'isSelected', type: 'string', defaultValue: ''},
	{name: 'customerCity',     type: 'string'},
	{name: 'customerName',     type: 'string'},
	{name: 'customerNo',     type: 'string'}
	]
});

Ext.regModel('modelSapShipTo',{
	fields:[
	{name: 'isSelected', type: 'string', defaultValue: ''},	        
	{name: 'city',     type: 'string'},
	{name: 'cityLine',     type: 'string'},
	{name: 'country',     type: 'string'},
	{name: 'currency',     type: 'string'},
	{name: 'customerId',     type: 'string'},
	{name: 'distChannel',     type: 'string'},
	{name: 'division',     type: 'string'},
	{name: 'divisionDesc',     type: 'string'},
	{name: 'emailAddress',     type: 'string'},
	{name: 'faxNumber',     type: 'string'},
	{name: 'firstName',     type: 'string'},
	{name: 'jobFunction',     type: 'string'},
	{name: 'lastName',     type: 'string'},
	{name: 'name3',     type: 'string'},
	{name: 'name4',     type: 'string'},
	{name: 'otherCity',     type: 'string'},
	{name: 'otherCountry',     type: 'string'},
	{name: 'partnerID',     type: 'string'},
	{name: 'partnerNo',     type: 'string'},
	{name: 'phoneNo1',     type: 'string'},
	{name: 'phoneNo2',     type: 'string'},
	{name: 'poBox',     type: 'string'},
	{name: 'postalCode',     type: 'string'},
	{name: 'salesOrg',     type: 'string'},
	{name: 'salesOrgDesc',     type: 'string'},
	{name: 'state',     type: 'string'},
	{name: 'zipCode',     type: 'string'}
	]
/*
,
	sorters: [
	          {
	              property : 'firstName',
	              direction: 'ASC'
	          }
	      ],
*/	      
});


Ext.regModel('modelSapDetails',{
	fields:[
	{name: 'batchOption',     type: 'string'},
	{name: 'batchOptionTxt',     type: 'string'},
	{name: 'confirmedQuantity',     type: 'string'},
	{name: 'currency',     type: 'string'},
	{name: 'customerPOItem',     type: 'string'},
	{name: 'customerProduct',     type: 'string'},
	{name: 'customerProductDesc',     type: 'string'},
	{name: 'deliveredQuantity',     type: 'string'},
	{name: 'description',     type: 'string'},
	{name: 'finalShippedDate',     type: 'string'},
	{name: 'freeQuantity',     type: 'string'},
	{name: 'isAvailableInPartnerCatalog',     type: 'string'},
	{name: 'itemDelivery',     type: 'string'},
	{name: 'itemValue',     type: 'string'},
	{name: 'loadLast',     type: 'string'},
	{name: 'netPrice',     type: 'string'},
	{name: 'netPriceUnit',     type: 'string'},
	{name: 'netQuantPriceUnit',     type: 'string'},
	{name: 'numberInt',     type: 'string'},
	{name: 'oldQuantity',     type: 'string'},
	{name: 'ordCallOff',     type: 'string'},
	{name: 'ordDelivery',     type: 'string'},
	{name: 'ordItemSch',     type: 'string'},
	{name: 'product',     type: 'string'},
	{name: 'productNo',     type: 'string'},
	{name: 'quantity',     type: 'string'},
	{name: 'quantityToDeliver',     type: 'string'},
	{name: 'reqDeliveryDate',     type: 'string'},
	{name: 'shipToAddress',     type: 'string'},
	{name: 'shippedFrom',     type: 'string'},
	{name: 'status',     type: 'string'},
	{name: 'totalLineVolume',     type: 'string'},
	{name: 'totalLineWeight',     type: 'string'},
	{name: 'unit',     type: 'string'},
	{name: 'unitOfVolume',     type: 'string'},
	{name: 'unitOfWeight',     type: 'string'},
	{name: 'quantityTrim',     type: 'string'},
	{name: 'confirmedQuantityTrim',     type: 'string'},
	{name: 'itemValueTrim',     type: 'string'},
	{name: 'netPriceTrim',     type: 'string'},
	{name: 'numberIntTrim',     type: 'string'},
	{name: 'productNoTrim',     type: 'string'},
	{name: 'customerProductTrim',     type: 'string'},
	{name: 'descriptionTrim',     type: 'string'}
	],
	
	formatData: function(docNum, shipName, soldName, reqDate, docDate){
		this.set('quantityTrim', removeTrailingDecimalZero( this.get('quantity') ) );
		this.set('confirmedQuantityTrim', removeTrailingDecimalZero( this.get('confirmedQuantity') ) );
		this.set('itemValueTrim', removeTrailingDecimalZero( this.get('itemValue') ) );
		this.set('netPriceTrim', removeTrailingDecimalZero( this.get('netPrice') ) );
		this.set('numberIntTrim', removeLeadingZero( this.get('numberInt') ) );
		this.set('productNoTrim', stringSegmentation(this.get('productNo'),9,' ') );
		this.set('customerProductTrim', stringSegmentation(this.get('customerProduct'),10,' ') );
		this.set('descriptionTrim', stringSegmentation(this.get('description'),20,' ') );
        // attempting to allow for grouping in associated dataStore
        this.set('documentNumber', docNum);
        this.set('shipToName', shipName);
        this.set('soldToName', soldName);
        this.set('requestedDeliveryDate', reqDate);
        this.set('documentDate', docDate);
    }
	
});

Ext.regModel('modelSapDeliveries',{
	fields:[
	{name: 'ordernum',     type: 'string'},	        
	{name: 'itemnum',     type: 'string'},	        
	{name: 'actualShippingDate',     type: 'string'},
	{name: 'carrier',     type: 'string'},
	{name: 'deliveryNo',     type: 'string'},
	{name: 'deliveryPosition',     type: 'string'},
	{name: 'objectId',     type: 'string'},
	{name: 'plannedSippingtDate',     type: 'string'},
	{name: 'quantity',     type: 'string'},
	{name: 'trackingNo',     type: 'string'},
	{name: 'trackingURL',     type: 'string'},
	{name: 'unitOfMeasurement',     type: 'string'}
	]
});


Ext.regModel('Search', {
    fields: [
        {name: 'soldTo',     type: 'string'},
        {name: 'docFrom',     type: 'string'},
        {name: 'docTo',     type: 'string'},
        {name: 'username',     type: 'string'},
        {name: 'password',     type: 'string'}
    ]
});

Ext.regModel('modelSapOrders2',{
	fields:[
	{name: 'billtoAddress',     type: 'string'},
	{name: 'bpNumber',     type: 'string'},
	{name: 'currency',     type: 'string'},
	{name: 'disChannel',     type: 'string'},
	{name: 'division',     type: 'string'},
	{name: 'docDate',     type: 'string'},
	{name: 'docNumber',     type: 'string'},
	{name: 'docType',     type: 'string'},
	{name: 'headerDescription',     type: 'string'},
	{name: 'ipcConnectionKey',     type: 'string'},
	{name: 'isSoldToVisible',     type: 'string'},
	{name: 'netValue',     type: 'string'},
	{name: 'ordItems',     type: 'string'},
	{name: 'payerAddress',     type: 'string'},
	{name: 'payerCity',     type: 'string'},
	{name: 'payerName',     type: 'string'},
	{name: 'payerNumber',     type: 'string'},
	{name: 'paymentTerms',     type: 'string'},
	{name: 'processType',     type: 'string'},
	{name: 'purchaseOrderExt',     type: 'string'},
	{name: 'pyNumber',     type: 'string'},
	{name: 'reqDeliveryDate',     type: 'string'},
	{name: 'salesOrg',     type: 'string'},
	{name: 'shNumber',     type: 'string'},
	{name: 'shipCond',     type: 'string'},
	{name: 'shipToAddress',     type: 'string'},
	{name: 'shipToCity',     type: 'string'},
	{name: 'shipToName',     type: 'string'},
	{name: 'shipToNumber',     type: 'string'},
	{name: 'soldToAddress',     type: 'string'},
	{name: 'soldToCity',     type: 'string'},
	{name: 'soldToName',     type: 'string'},
	{name: 'soldToNumber',     type: 'string'},
	{name: 'spNumber',     type: 'string'},
	{name: 'totalOrderVolume',     type: 'string'},
	{name: 'totalOrderVolumeUOM',     type: 'string'},
	{name: 'totalOrderWeight',     type: 'string'},
	{name: 'totalOrderWeightUOM',     type: 'string'}
	],
	
	transferData: function(recIndex){
		//console.log('calling transferData routine');
		
		var thisRec = mobilens.storeSAPOrders.getAt(parseInt(recIndex));

		thisRec.set('payerAddress', this.get('payerAddress') );
		thisRec.set('totalOrderVolume', this.get('totalOrderVolume') );
		thisRec.set('totalOrderVolumeUOM', this.get('totalOrderVolumeUOM') );
		thisRec.set('totalOrderWeight', this.get('totalOrderWeight') );
		thisRec.set('totalOrderWeightUOM', this.get('totalOrderWeightUOM') );
		thisRec.set('shipCond', this.get('shipCond') );
	}
});

Ext.regModel('modelSAPOrders', {
	fields: [
	         {name: 'itemUpdate', type: 'string', defaultValue: ''},
	         {name: 'refreshed', type: 'string', defaultValue: ''},
	         {name: 'itemsRefreshed', type: 'string', defaultValue: ''},	         
	         {name: 'orderDisclose', type: 'string', defaultValue: '2'},
	         {name: 'isSelected', type: 'string', defaultValue: ''},
	         {name: 'isShipToFiltered', type: 'string', defaultValue: ''},	         
	         {name: 'itemCount', type: 'string', defaultValue: '0'},
	         {name: 'hasItems', type: 'string', defaultValue: '0'},
	         {name: 'Text', type: 'string', defaultValue: ''},
	         {name: '_children',  type: 'string' , defulautValue: ''},
	         {name: 'actualDeliveredQuantity',  type: 'string' , defulautValue: ''},
	         {name: 'actualGoodsMovementDate',  type: 'string' , defulautValue: ''},
	         {name: 'billingDocPostingStatus',  type: 'string' , defulautValue: ''},
	         {name: 'billingStatus',  type: 'string' , defulautValue: ''},
	         {name: 'contractValidFrom',  type: 'string' , defulautValue: ''},
	         {name: 'contractValidTo',  type: 'string' , defulautValue: ''},
	         {name: 'contractValidityPeriod',  type: 'string' , defulautValue: ''},
	         {name: 'createdDate',  type: 'string' , defulautValue: ''},
	         {name: 'cumulativeOrderQty',  type: 'string' , defulautValue: ''},
	         {name: 'custPoNumber',  type: 'string' , defulautValue: ''},
	         {name: 'customerAddress',  type: 'string' , defulautValue: ''},
	         {name: 'customerPoNumber',  type: 'string' , defulautValue: ''},
	         {name: 'customerPoNumberDispatchedOrder',  type: 'string' , defulautValue: ''},
	         {name: 'customerProductDesc',  type: 'string' , defulautValue: ''},
	         {name: 'delayStatus',  type: 'string' , defulautValue: ''},
	         {name: 'deliveryAddress',  type: 'string' , defulautValue: ''},
	         {name: 'deliveryStatus',  type: 'string' , defulautValue: ''},
	         {name: 'deliveryStatusOfItems',  type: 'string' , defulautValue: ''},
	         {name: 'distChannel',  type: 'string' , defulautValue: ''},
	         {name: 'division',  type: 'string' , defulautValue: ''},
	         {name: 'documentDate',  type: 'string' , defulautValue: ''},
	         {name: 'documentNumber',  type: 'string' , defulautValue: ''},
	         {name: 'entryTime',  type: 'string' , defulautValue: ''},
	         {name: 'goodsMovementStatus',  type: 'string' , defulautValue: ''},
	         {name: 'inCompletionStatus',  type: 'string' , defulautValue: ''},
	         {name: 'inCompletionStatusOfBilling',  type: 'string' , defulautValue: ''},
	         {name: 'inCompletionStatusOfDeliveryItems',  type: 'string' , defulautValue: ''},
	         {name: 'inCompletionStatusOfHeader',  type: 'string' , defulautValue: ''},
	         {name: 'materialLongDesc',  type: 'string' , defulautValue: ''},
	         {name: 'materialNo',  type: 'string' , defulautValue: ''},
	         {name: 'materialNumberByCustomer',  type: 'string' , defulautValue: ''},
	         {name: 'netValue',  type: 'string' , defulautValue: ''},
	         {name: 'orderBillingStatus',  type: 'string' , defulautValue: ''},
	         {name: 'orderReason',  type: 'string' , defulautValue: ''},
	         {name: 'orderType',  type: 'string' , defulautValue: ''},
	         {name: 'overAllBillingBlockStatus',  type: 'string' , defulautValue: ''},
	         {name: 'overAllBlockedStatus',  type: 'string' , defulautValue: ''},
	         {name: 'overAllDeliveryBlockStatus',  type: 'string' , defulautValue: ''},
	         {name: 'packingStatus',  type: 'string' , defulautValue: ''},
	         {name: 'pickConfirmationStatus',  type: 'string' , defulautValue: ''},
	         {name: 'pickingStatus',  type: 'string' , defulautValue: ''},
	         {name: 'podStatusHeader',  type: 'string' , defulautValue: ''},
	         {name: 'processingStatusOfDoc',  type: 'string' , defulautValue: ''},
	         {name: 'reasonForCancellation',  type: 'string' , defulautValue: ''},
	         {name: 'reasonForRejection',  type: 'string' , defulautValue: ''},
	         {name: 'refDocumentHeaderStatus',  type: 'string' , defulautValue: ''},
	         {name: 'refStatusOfItems',  type: 'string' , defulautValue: ''},
	         {name: 'rejectionStatusOfItems',  type: 'string' , defulautValue: ''},
	         {name: 'requestedDeliveryDate',  type: 'string' , defulautValue: ''},
	         {name: 'salesDocumentItem',  type: 'string' , defulautValue: ''},
	         {name: 'salesDocumentType',  type: 'string' , defulautValue: ''},
	         {name: 'salesOrg',  type: 'string' , defulautValue: ''},
	         {name: 'salesUnit',  type: 'string' , defulautValue: ''},
	         {name: 'sdDocumentCategory',  type: 'string' , defulautValue: ''},
	         {name: 'sdDocumentCurrency',  type: 'string' , defulautValue: ''},
	         {name: 'sdItemNo',  type: 'string' , defulautValue: ''},
	         {name: 'searchTerm',  type: 'string' , defulautValue: ''},
	         {name: 'shipToCity',  type: 'string' , defulautValue: ''},
	         {name: 'shipToName',  type: 'string' , defulautValue: ''},
	         {name: 'shipToNo',  type: 'string' , defulautValue: ''},
	         {name: 'soldTo',  type: 'string' , defulautValue: ''},
	         {name: 'soldToCity',  type: 'string' , defulautValue: ''},
	         {name: 'soldToName',  type: 'string' , defulautValue: ''},
	         {name: 'status',  type: 'string' , defulautValue: ''},
	         {name: 'statusz',  type: 'string' , defulautValue: ''},
	         {name: 'totalInCompletionStatusForPackaging',  type: 'string' , defulautValue: ''},
	         {name: 'totalInCompletionStatusForPicking',  type: 'string' , defulautValue: ''},
	         {name: 'totalInCompletionStatusForPostGoodsMvmt',  type: 'string' , defulautValue: ''},
	         {name: 'unitOfContractValidityPeriod',  type: 'string' , defulautValue: ''},
	         {name: 'payerAddress',     type: 'string'},
	         {name: 'totalOrderVolume',     type: 'string'},
	         {name: 'totalOrderVolumeUOM',     type: 'string'},
	         {name: 'totalOrderWeight',     type: 'string'},
	         {name: 'totalOrderWeightUOM',     type: 'string'},
	         {name: 'shipCond',     type: 'string'}
	         ],

	         // currently Sencha Touch does not handle more than 1 associated dataStore.  So an independent store will be used to merge data into the primary order store for Orders2 data
		    associations:  
                [ { 
                    type: 'hasMany', 
                    model: 'modelSapDetails', 
                    name: 'orderItems',
                    getGroupString : function(record) {

                        var retVal = 'A';
                        console.log('model.SAPDetails.getGroupString()');
                        
                        switch( mobilens.orderSort )
                        {
                        case '':
                            retVal = record.get('soldToName').substr(0,2);
                            break;
                        case 'requestedDeliveryDate': case 'documentDate':
                            retVal = record.get(mobilens.orderSort).substr(0,10);        
                            break;
                        default:
                            retVal = record.get(mobilens.orderSort).substr(0,2);
                            break;
                        }
        
                        //return retVal;
                        return 'EV';
                    }
                } ],

            formatData: function(refreshDate){
                var crazyTrain = new Date( refreshDate );
                this.set({refreshed: crazyTrain.getFullYear() + '-' + crazyTrain.getMonth() + '-' + crazyTrain.getDate() + ' ' + crazyTrain.toLocaleTimeString() });
                this.set('documentNumberTrim', removeLeadingZero( this.get('documentNumber') ) );
            }
});

/* **************************************************************** */
/*                  User Store Model                               */
/* **************************************************************** */

Ext.regModel('SAMUser', {
    fields: ['userName', 'password','lastUpdated', 'numOfDays', 'lastResponse'],
    refreshResponse: function() {
        var myD = new Date();
        var myName = this.get('userName');
        var myPassword = this.get('password');
        var myResponse = this.get('lastResponse');
        var daysOfHistory = this.get('numOfDays');

        db.transaction(function(transaction){transaction.executeSql('DELETE FROM tblLogin',[],[],db.onError)});					
        db.transaction(function(transaction){transaction.executeSql('INSERT INTO tblLogin (username, password, refreshed, lastResponse, daysOfHistory) VALUES (?,?,?,?,?)',[myName,myPassword,myD,myResponse,daysOfHistory],[],db.onError)});
    }
});


/* **************************************************************** */
/*                  Store Instantiation                             */
/* **************************************************************** */

mobilens.SAMuserStore = new Ext.data.Store({
	model: 'SAMUser'
});

mobilens.storeSAPSoldToPartners = new Ext.data.Store({
    model: 'modelSAPSoldTo'
});

mobilens.storeSAPShipToCustomers = new Ext.data.Store({
    model: 'modelSapShipTo',
	sorters: 'firstName',
	getGroupString : function(record) {
		return record.get('firstName')[0];
	}
});

mobilens.storeSAPDeliveries = new Ext.data.Store({
    model: 'modelSapDeliveries'
});

mobilens.storeDaysOfHistory = new Ext.data.Store({
    model: 'modelSAPSoldTo'
});

mobilens.storeMessages = new Ext.data.Store({
    model: 'modelMessageStore',
    
    getGroupString : function(record) {
        return 'A';
	}
});


mobilens.SAMindexBarStore = new Ext.data.Store({
    model: 'modelIndexBarStore',
    data : [
        {key: 'Primary', value: '*', filter1: 'Top'},
        {key: 'Primary', value: 'A', filter1: 'Alphabet'},
        {key: 'Primary', value: 'B', filter1: 'Alphabet'},
        {key: 'Primary', value: 'C', filter1: 'Alphabet'},
        {key: 'Primary', value: '1', filter1: 'Numeric'},
        {key: 'Primary', value: '2', filter1: 'Numeric'},
        {key: 'Primary', value: '3', filter1: 'Numeric'}
        
    ]    
    
});




mobilens.storeSAPOrders = new Ext.data.Store({
	model: 'modelSAPOrders',
    
    sortBy: function( v ) {

        mobilens.orderSort = v;
        if( mobilens.orderSort === '' ) { mobilens.orderSort = 'soldToName'; }
        
        switch(mobilens.orderSort)
        {   
            case 'documentNumberTrim':
                this.sort( mobilens.orderSort ,'ASC');
                //mobilens.myIndexBar.numberSwitch();
                break;
            case 'requestedDeliveryDate': 
                this.sort( mobilens.orderSort ,'ASC'); 
                //mobilens.myIndexBar.dateSwitch();
                break;
            case 'documentDate':
                this.sort( mobilens.orderSort ,'DESC'); 
                //mobilens.myIndexBar.dateSwitch();        
                break;
            default:
                this.sort( mobilens.orderSort ,'ASC'); 
                //mobilens.myIndexBar.alphaSwitch();
                break;
        }
    },
    
	getGroupString : function(record) {
        
        var retVal = 'A';

        switch( mobilens.orderSort )
        {
        case '':
            retVal = record.get('soldToName').substr(0,2);
            break;
        case 'requestedDeliveryDate': case 'documentDate':
            retVal = record.get(mobilens.orderSort).substr(0,10);        
            break;
        default:
            retVal = record.get(mobilens.orderSort).substr(0,2);
            break;
        }
        
        //console.log('storeSAPOrders.getGroupString(\''+mobilens.orderSort+'\') -- > ' + retVal);
		return retVal;
	}
});

mobilens.myIndexBar = new Ext.IndexBar({
    dock    : 'right',
    overlay : true,
    store: mobilens.SAMindexBarStore,
    componentCls: 'SAMindexBar',
    //direction:'horizontal',
    direction:'vertical',
    listeners: { 
        index : function(x,y,z){ 
            mobilens.storeSAPOrders.clearFilter();
            
            switch ( y.dom.innerText )
            {
            case '*':
                mobilens.orderList.scroller.scrollTo({x:0,y:0});
                break;
            case '#':
                mobilens.orderList.scroller.updateBoundary();
                mobilens.orderList.scroller.scrollTo({x: 0, y:mobilens.orderList.scroller.size.height}, true);
                break;
            case '|<':
                mobilens.currentPage = 1;
                break;
            case '<<':
                mobilens.currentPage += -1;
                break;
            case '>>':
                mobilens.currentPage += 1;
                break;
            case '>|':
                mobilens.currentPage = 10;
                break;
            default:
                mobilens.currentPage = y.dom.innerText;
                break;
            }
            
            mobilens.orderList.applyShipToFilter();
        }
    },
    numberSwitch: function(){
        this.store.removeAll();
        this.store.add({key:'primary',value:'|<',filter1:'1'});
        this.store.add({key:'primary',value:'<<',filter1:'1'});        
//        this.store.add({key:'primary',value:'0',filter1:'2'});        
        this.store.add({key:'primary',value:'1',filter1:'3'});
        this.store.add({key:'primary',value:'2',filter1:'4'});
        this.store.add({key:'primary',value:'3',filter1:'5'});        
        this.store.add({key:'primary',value:'4',filter1:'6'});        
        this.store.add({key:'primary',value:'5',filter1:'7'});        
        this.store.add({key:'primary',value:'6',filter1:'8'});        
        this.store.add({key:'primary',value:'7',filter1:'9'});        
        this.store.add({key:'primary',value:'8',filter1:'10'});        
        this.store.add({key:'primary',value:'9',filter1:'11'});        
        this.store.add({key:'primary',value:'10',filter1:'12'});        
        this.store.add({key:'primary',value:'>>',filter1:'990'});        
        this.store.add({key:'primary',value:'>|',filter1:'999'});                
    },

    dateSwitch: function(){
        this.store.removeAll();
        this.store.add({key:'primary',value:'*',filter1:'1'});
        this.store.add({key:'primary',value:'2011-05',filter1:'2'});        
        this.store.add({key:'primary',value:'2011-06',filter1:'3'});
        this.store.add({key:'primary',value:'2011-07',filter1:'4'});
        this.store.add({key:'primary',value:'2011-08',filter1:'5'});        
        this.store.add({key:'primary',value:'2011-09',filter1:'6'});        
        this.store.add({key:'primary',value:'2011-10',filter1:'7'});        
        this.store.add({key:'primary',value:'2011-11',filter1:'8'});        
        this.store.add({key:'primary',value:'2011-12',filter1:'9'});        
        this.store.add({key:'primary',value:'2012-01',filter1:'10'});        
        this.store.add({key:'primary',value:'#',filter1:'999'});                
    },

    alphaSwitch: function(){
        this.store.removeAll();
        this.store.add({key:'primary',value:'*',filter1:'1'});
        this.store.add({key:'primary',value:'A',filter1:'2'});
        this.store.add({key:'primary',value:'B',filter1:'3'});
        this.store.add({key:'primary',value:'C',filter1:'4'});
        this.store.add({key:'primary',value:'D',filter1:'5'});        
        this.store.add({key:'primary',value:'E',filter1:'6'});        
        this.store.add({key:'primary',value:'F',filter1:'7'});        
        this.store.add({key:'primary',value:'G',filter1:'8'});        
        this.store.add({key:'primary',value:'H',filter1:'9'});        
        this.store.add({key:'primary',value:'I',filter1:'10'});
        this.store.add({key:'primary',value:'J',filter1:'11'});
        this.store.add({key:'primary',value:'K',filter1:'12'});        
        this.store.add({key:'primary',value:'L',filter1:'13'});
        this.store.add({key:'primary',value:'M',filter1:'14'});
        this.store.add({key:'primary',value:'N',filter1:'15'});
        this.store.add({key:'primary',value:'O',filter1:'16'});
        this.store.add({key:'primary',value:'P',filter1:'17'});
        this.store.add({key:'primary',value:'Q',filter1:'18'});
        this.store.add({key:'primary',value:'R',filter1:'19'});
        this.store.add({key:'primary',value:'S',filter1:'20'});
        this.store.add({key:'primary',value:'T',filter1:'21'});
        this.store.add({key:'primary',value:'U',filter1:'22'});
        this.store.add({key:'primary',value:'V',filter1:'23'});
        this.store.add({key:'primary',value:'W',filter1:'24'});
        this.store.add({key:'primary',value:'X',filter1:'25'});
        this.store.add({key:'primary',value:'Y',filter1:'26'});
        this.store.add({key:'primary',value:'Z',filter1:'27'});        
        this.store.add({key:'primary',value:'#',filter1:'999'});
    }
     
});

/* **************************************************************** */
/*                  Store Defaults & Functions                      */
/* **************************************************************** */

mobilens.storeDaysOfHistory.add({isSelected: '0'}); 
mobilens.storeMessages.add({msg1:'<br>Please wait while data is updated',msg2:'...No Deliveries Exist...'});

mobilens.myIndexBar.numberSwitch();


