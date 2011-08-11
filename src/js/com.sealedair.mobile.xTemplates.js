
// Namespace Declarations
Ext.ns('SACCRM', 'mobilens', 'Ext.ux');

Date.prototype.adjust = function(yr,mn,dy,hr,mi,se) {
    var m,t;
    this.setYear(this.getFullYear() + yr);
    m = this.getMonth() + mn;
    if(m !== 0) this.setYear(this.getFullYear() + Math.floor(m/12));
    if(m < 0)
        { this.setMonth(12 + (m%12)); } 
    else
        if(m > 0) 
            { this.setMonth(m%12); }
    t = this.getTime();
    t += (dy * 86400000);
    t += (hr * 3600000);
    t += (mi * 60000);
    t += (se * 1000);
    this.setTime(t);
};


function stringSegmentation( sourceData, segLen, sepChar ){
    var segmentedReturn = '';
	var counter = 1;
	
	for ( var x=0;x<sourceData.length;x++)
		{
		 var myC = sourceData.slice(x,x+1);
		 
		 if ( myC == sepChar )
			 { counter = 1; }
		 else
			 {  if( counter==segLen)
                    {
                        myC += sepChar;
                        counter = 1;
                    }
                else
                    { counter += 1; }
			 }
		 segmentedReturn += myC;
		}
	
	return segmentedReturn;
}

function removeTrailingDecimalZero( sourceData ){
	if( sourceData.indexOf('.') > -1 )
		{
		var trimZeros = sourceData.replace(/0+$/, '');
		var trimDecimal = trimZeros.replace(/\.+$/, '');
		var finalOut = '';
		if( trimDecimal==='')
			{ finalOut = '0'; }
		else
			{ finalOut = trimDecimal; }
		return trimDecimal;
		}
	else
		{ // if there is no decimal in the string do no remove any trailing zeros 
		return sourceData;
		}
}

function removeLeadingZero( sourceData ){
	var trimZeros = sourceData.replace(/^[0]+/g,"");
	return trimZeros;
}

function htmlSpacePadding( cLen, rSym ){
	var myR = '';
	
	for( var i=0;i<=cLen;i++)
		{
//		 myR += '&nbsp;';
		myR += rSym;
		}
	
	if (myR === '' )
		{ return myR; }
	else
		{ return myR + '<br>'; }
}


mobilens.xTplOrdersPrimaryLandscapeExpand = '<tpl for="."><div class="colmask doublepage"><div class="colleft">'+
'<div class="col1">'+ 
'<!-- Column 1 start -->'+
'<table table align=center width=100% border=0><tr><td width=40%>'+
'<div class="itemCount">'+
' <tpl if="isSelected==1"><div class="headerItemCounterSelected">{itemCount}</div></tpl>'+
' <tpl if="hasItems!=1 && isSelected!=1"><div class="headerItemCounter">{itemCount}</div></tpl>'+
' <tpl if="hasItems==1 && isSelected!=1"><div class="headerItemCounterHasItems">{itemCount}</div></tpl>'+
'</div>'+
'</td><td align=right width=60% >'+
'<tpl if="orderDisclose!=1">'+
'<tpl if="orderDisclose!=3">'+
'<div class="expand"></div></tpl>'+
'<tpl if="orderDisclose==3"><div class="expandUpdate"></div></tpl></tpl>'+
'<tpl if="orderDisclose==1"><div class="expanded"></div></tpl>'+
'</td></tr></table>'+
'<p class="orderNumber">{documentNumberTrim}</p>'+


'<tpl if="orderDisclose==1">'+
'<div class="item-detail-radius">'+
' <p class="refreshLabel">Refreshed:<br>{refreshed}</p>'+
' <p class="headerLabel">Payer(Number):&nbsp;&nbsp</p><p class="headerDetail">&nbsp {payerAddress}</p>'+
' <p class="headerLabel">Deliver Address:&nbsp;&nbsp</p><p class="headerDetail">&nbsp {deliveryAddress}</p>'+
' <p class="headerLabel">Payment Terms:&nbsp;&nbsp</p><p class="headerDetail">&nbsp {paymentTerms} </p>'+
' <p class="headerLabel">Total Net Price:&nbsp;&nbsp</p><p class="headerDetail">&nbsp {netValue}</p>'+
' <p class="headerLabel">Shipping Conditions:&nbsp;&nbsp</p><p class="headerDetail">&nbsp {shipCond}</p>'+
'</div>'+
'</tpl>'+
'<!-- Column 1 end -->'+


'</div><div class="col2">'+
'<!-- Column 2 start -->'+ 
' <p><span class="headerLabel">Ship To:&nbsp;&nbsp;&nbsp;</span><span class="xTplShipTo">{shipToName} [{shipToNo}] [{salesOrg}][{division}], {shipToCity}</span></p>'+
' <p><span class="headerLabel">Sold To:&nbsp;&nbsp;&nbsp;</span><span class="xTplSoldTo">{soldToName} [{soldTo}] [{salesOrg}][{division}], {soldToCity}</span></p>'+
' <p><span class="headerLabel">Doc Type:&nbsp;&nbsp;&nbsp;</span><span class="headerDetail">{salesDocumentType}&nbsp;&nbsp;&nbsp&nbsp;&nbsp;</span>'+ //{custPONumber}&nbsp;&nbsp;&nbsp&nbsp;&nbsp;</span>'+
' <span class="headerLabel">Req Delivery:&nbsp;&nbsp;&nbsp;</span><span class=headerDetail>{requestedDeliveryDate}&nbsp;&nbsp;&nbsp&nbsp;&nbsp;</span>'+
' <span class="headerLabel">Doc Date:&nbsp;&nbsp;&nbsp;</span><span class=headerDetail>{documentDate}&nbsp;&nbsp;&nbsp&nbsp;&nbsp;</span>'+
' <span class="headerLabel">Page:&nbsp;&nbsp;&nbsp;</span><span class=headerDetail>{page}&nbsp;&nbsp;&nbsp&nbsp;&nbsp;</span>'+
'<tpl if="orderDisclose==1">'+
'<div class="item-detail-radius">'+

'<left><table class="detailT detailTBLwide" summary="">'+
'<caption class="detailC"><table>'+
'<tpl if="itemUpdate==1"><tr><td class="detailTD" width=100%><center><div class="SAMprogress"></div></td></tr></tpl>'+
'<tpl if="itemUpdate!=1">'+
'    <tpl if="hasItems!=1"><tr><td class="detailTD" width=60%><p class="itemRefreshLabel"> No Items Have Been Downloaded </p></td></tpl>'+
'	<tpl if="hasItems==1"><tr><td class="detailTD" width=60%><p class="itemRefreshLabel">Refreshed:&nbsp;&nbsp {itemsRefreshed}</p></td></tpl>'+
'	<td class="detailTD" width=39%><div class="detailText">Refresh Item Detail - </div></td><td class="detailTD" width=1%><div class="detail" onClick="refreshOrderLine([\'{parent.documentNumber}\']);"></div></td></tr>'+
'</tpl>'+
'</table></caption><thead>'+
'<tr>'+
'<th scope="col" class="detailTH wideCOLa">'+htmlSpacePadding(1,'')+'</th>'+
'<th scope="col" class="detailTH wideCOLb">'+htmlSpacePadding(1,'')+'</th>'+
'<th scope="col" class="detailTH wideCOLc">'+htmlSpacePadding(6,'')+'Product</th>'+
'<th scope="col" class="detailTH wideCOLd">'+htmlSpacePadding(9,'')+'Cust Prod</th>'+
'<th scope="col" class="detailTH wideCOLe">'+htmlSpacePadding(3,'')+'Qty</th>'+
'<th scope="col" class="detailTH wideCOLf">'+htmlSpacePadding(20,'')+'Description</th>'+
'<th scope="col" class="detailTH wideCOLg">'+htmlSpacePadding(4,'')+'Avail</th>'+
'<th scope="col" class="detailTH wideCOLh">'+htmlSpacePadding(9,'')+'Total Price <br> Unit Price</th>'+
'<th scope="col" class="detailTH wideCOLi">'+htmlSpacePadding(5,'')+'Status</th>'+
'<th scope="col" class="detailTH wideCOLj">'+htmlSpacePadding(7,'')+'Shipped / Remain Qty</th>'+
'</tr>'+
'</thead>'+
'<tbody>'+
'<tpl for="orderItems">'+
'<tr>'+
'<td class="detailTD"><div class="delivery" onClick="displayOrderItemDelivery(\'{parent.documentNumber}\',\'{product}\',\'{shippedFrom}\',\'{totalLineVolume} {unitOfVolume}\', \'{totalLineWeight} {unitOfWeight}\');"></div></td>'+
'<td class="detailTD">{numberIntTrim}</td>'+
'<td class="detailTD">{productNoTrim}</td>'+
'<td class="detailTD">{customerProductTrim}</td>'+
'<td class="detailTD">{quantityTrim} {unit}</td>'+
'<td class="detailTD">{descriptionTrim}</td>'+
'<td class="detailTD">{confirmedQuantityTrim}</td>'+
'<td class="detailTD">{itemValueTrim} {currency}<br>{netPriceTrim} /{netQuantPriceUnit} {netPriceUnit}</td>'+
'<td class="detailTD">{status}</td>'+
'<td class="detailTD">{deliveredQty}/{Quantitytodeliver}</td>'+
'</tr>'+
'</tpl>'+
'</tbody>'+
'</table></left>'+

'</div>'+
'</tpl>'+
'<!-- Column 2 end -->'+ 
'</div></div></div>';





mobilens.xTplOrdersPrimary = ''+
    '<tpl for=".">'+
        '<div class="colmask doublepage"><div class="colleft">'+
'<div class="col1">'+ 
'<!-- Column 1 start -->'+
'<table table align=center width=100% border=0><tr><td width=40%>'+
'<div class="itemCount">'+
' <tpl if="isSelected==1"><div class="headerItemCounterSelected">{itemCount}</div></tpl>'+
' <tpl if="hasItems!=1 && isSelected!=1"><div class="headerItemCounter">{itemCount}</div></tpl>'+
' <tpl if="hasItems==1 && isSelected!=1"><div class="headerItemCounterHasItems">{itemCount}</div></tpl>'+
'</div>'+
'</td><td align=right width=60% >'+
'<tpl if="orderDisclose!=1">'+
'<tpl if="orderDisclose!=3">'+
'<div class="expand"></div></tpl>'+
'<tpl if="orderDisclose==3"><div class="expandUpdate"></div></tpl></tpl>'+
'</td></tr></table>'+
'<p class="orderNumber">{documentNumberTrim}</p>'+


'<!-- Column 1 end -->'+


'</div><div class="col2">'+
'<!-- Column 2 start -->'+ 
' <p><span class="headerLabel">Ship To:&nbsp;&nbsp;&nbsp;</span><span class="xTplShipTo">{shipToName} [{shipToNo}] [{salesOrg}][{division}], {shipToCity}</span></p>'+
' <p><span class="headerLabel">Sold To:&nbsp;&nbsp;&nbsp;</span><span class="xTplSoldTo">{soldToName} [{soldTo}] [{salesOrg}][{division}], {soldToCity}</span></p>'+
' <p><span class="headerLabel">Doc Type:&nbsp;&nbsp;&nbsp;</span><span class="headerDetail">{salesDocumentType}&nbsp;&nbsp;&nbsp&nbsp;&nbsp;</span>'+ //{custPONumber}&nbsp;&nbsp;&nbsp&nbsp;&nbsp;</span>'+
' <span class="headerLabel">Req Delivery:&nbsp;&nbsp;&nbsp;</span><span class=headerDetail>{requestedDeliveryDate}&nbsp;&nbsp;&nbsp&nbsp;&nbsp;</span>'+
' <span class="headerLabel">Doc Date:&nbsp;&nbsp;&nbsp;</span><span class=headerDetail>{documentDate}&nbsp;&nbsp;&nbsp&nbsp;&nbsp;</span>'+

'<!-- Column 2 end -->'+ 
'</div></div></div>';


mobilens.xTplOrdersTest_old = ''+
    '<tpl for=".">'+
' <div class="itemCount">'+
        '<div class="headerItemCounterHasItemsTest">&nbsp;&nbsp;&nbsp; {itemCount} &nbsp;&nbsp;&nbsp;</div>'+
        '<div><p><span class="headerLabel">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Order:&nbsp;&nbsp;&nbsp;</span><span class="xTplShipTo">{documentNumberTrim}</span></p></div>'+
        '<div class="expandTest">&nbsp;&nbsp; + &nbsp;&nbsp;</div><br></div>'+
' <!-- Column 1 end -->'+
//' <div><p><span class="headerLabel">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Order:&nbsp;&nbsp;&nbsp;</span><span class="xTplShipTo">{documentNumberTrim}</span></p>'+
' <div><p><span class="headerLabel">Ship To:&nbsp;&nbsp;&nbsp;</span><span class="xTplShipTo">{shipToName} [{shipToNo}] [{salesOrg}][{division}], {shipToCity}</span></p>'+
' <p><span class="headerLabel">Sold To:&nbsp;&nbsp;&nbsp;</span><span class="xTplSoldTo">{soldToName} [{soldTo}] [{salesOrg}][{division}], {soldToCity}</span></p>'+
' <p><span class="headerLabel">Doc Type:&nbsp;&nbsp;&nbsp;</span><span class="headerDetail">{salesDocumentType}&nbsp;&nbsp;&nbsp&nbsp;&nbsp;</span>'+ //{custPONumber}&nbsp;&nbsp;&nbsp&nbsp;&nbsp;</span>'+
' <span class="headerLabel">Req Delivery:&nbsp;&nbsp;&nbsp;</span><span class=headerDetail>{requestedDeliveryDate}&nbsp;&nbsp;&nbsp&nbsp;&nbsp;</span>'+
' <span class="headerLabel">Doc Date:&nbsp;&nbsp;&nbsp;</span><span class=headerDetail>{documentDate}&nbsp;&nbsp;&nbsp&nbsp;&nbsp;</span></div>';



mobilens.xTplOrdersTest = ''+
    '<tpl for=".">'+
' <table><tr><td><span class="headerLabel">Order:&nbsp;&nbsp;&nbsp; </span></td><td class="expandTest">{documentNumberTrim}</td>'+
' <td><span class="headerLabel">&nbsp;&nbsp;&nbsp;Downloaded Items:&nbsp;&nbsp;&nbsp; </span></td>'+
             '<td class="itemCountTestISS{isSelected}HI{hasItems}"> &nbsp;&nbsp;{itemCount}&nbsp;&nbsp; </td>'+
' </tr></table> ' +
' <table><tr><td><span class="headerLabel">Ship To:&nbsp;&nbsp;&nbsp;</span><span class="headerDetail">{shipToName} [{shipToNo}] [{salesOrg}][{division}], {shipToCity}</span><br>'+
' <span class="headerLabel">Sold To:&nbsp;&nbsp;&nbsp;</span><span class="headerDetail">{soldToName} [{soldTo}] [{salesOrg}][{division}], {soldToCity}</span><br>'+
' <span class="headerLabel">Doc Type:&nbsp;&nbsp;&nbsp;</span><span class="headerDetail">{salesDocumentType}&nbsp;&nbsp;&nbsp&nbsp;&nbsp;'+
' <span class="headerLabel">Req Delivery:&nbsp;&nbsp;&nbsp;</span><span class="headerDetail">{requestedDeliveryDate}&nbsp;&nbsp;&nbsp&nbsp;&nbsp;'+
' <span class="headerLabel">Doc Date:&nbsp;&nbsp;&nbsp;{documentDate}&nbsp;&nbsp;&nbsp&nbsp;&nbsp;</span><span class="headerDetail">'+
    '</td></tr></table></tpl>';






mobilens.xTplOrdersPrimaryPortraitExpand = '<tpl for="."><div class="colmask doublepage"><div class="colleft">'+
'<div class="col1">'+ 
'<!-- Column 1 start -->'+
'<table table align=center width=100% border=0><tr><td width=40%>'+
'<div class="itemCount">'+
' <tpl if="isSelected==1"><div class="headerItemCounterSelected">{itemCount}</div></tpl>'+
' <tpl if="hasItems!=1 && isSelected!=1"><div class="headerItemCounter">{itemCount}</div></tpl>'+
' <tpl if="hasItems==1 && isSelected!=1"><div class="headerItemCounterHasItems">{itemCount}</div></tpl>'+
'</div>'+
'</td><td align=right width=60%>'+
'<tpl if="orderDisclose!=1">'+
'<tpl if="orderDisclose!=3">'+
'<div class="expand"></div></tpl>'+
'<tpl if="orderDisclose==3"><div class="expandUpdate"></div></tpl></tpl>'+
'<tpl if="orderDisclose==1"><div class="expanded"></div></tpl>'+
'</td></tr></table>'+
'<p class="orderNumber">{documentNumberTrim}</p>'+


'<tpl if="orderDisclose==1">'+
'<div class="item-detail-radius">'+
' <p class="refreshLabel">Refreshed:<br>{refreshed}</p>'+
' <p class="headerLabel">Payer(Number):&nbsp;&nbsp</p><p class="headerDetail">&nbsp {payerAddress}</p>'+
' <p class="headerLabel">Deliver Address:&nbsp;&nbsp</p><p class="headerDetail">&nbsp {deliveryAddress}</p>'+
' <p class="headerLabel">Payment Terms:&nbsp;&nbsp</p><p class="headerDetail">&nbsp {paymentTerms} </p>'+
' <p class="headerLabel">Total Net Price:&nbsp;&nbsp</p><p class="headerDetail">&nbsp {netValue}</p>'+
' <p class="headerLabel">Shipping Conditions:&nbsp;&nbsp</p><p class="headerDetail">&nbsp {shipCond}</p>'+
'</div>'+
'</tpl>'+
'<!-- Column 1 end -->'+


'</div><div class="col2">'+
'<!-- Column 2 start -->'+ 
' <p><span class="headerLabel">Ship To:&nbsp;&nbsp;&nbsp;</span><span class="xTplShipTo">{shipToName} [{shipToNo}] [{salesOrg}][{division}], {shipToCity}</span></p>'+
' <p><span class="headerLabel">Sold To:&nbsp;&nbsp;&nbsp;</span><span class="xTplSoldTo">{soldToName} [{soldTo}] [{salesOrg}][{division}], {soldToCity}</span></p>'+
' <p><span class="headerLabel">Doc Type:&nbsp;&nbsp;&nbsp;</span><span class="headerDetail">{salesDocumentType}&nbsp;&nbsp;&nbsp&nbsp;&nbsp;</span>'+ //{custPONumber}&nbsp;&nbsp;&nbsp&nbsp;&nbsp;</span>'+
' <span class="headerLabel">Req Delivery:&nbsp;&nbsp;&nbsp;</span><span class=headerDetail>{requestedDeliveryDate}&nbsp;&nbsp;&nbsp&nbsp;&nbsp;</span>'+
' <span class="headerLabel">Document Date:&nbsp;&nbsp;&nbsp;</span><span class=headerDetail>{documentDate}&nbsp;&nbsp;&nbsp&nbsp;&nbsp;</span>'+
'<tpl if="orderDisclose==1">'+
'<div class="item-detail-radius">'+
//'<tpl if="hasItems==1>'+
//'<tpl for="orderItems">'+


'<left><table class="detailT detailTBLport" summary="">'+
'<caption class="detailC"><table><tr>'+
'<tpl if="itemUpdate==1"><td width=60%><div class="SAMprogress"></div></td> </tpl>'+
'<tpl if="itemUpdate!=1">'+
'	<tpl if="hasItems!=1"><td width=60%><p class="itemRefreshLabel"> No Items Have Been Downloaded </p></td></tpl>'+
'	<tpl if="hasItems==1"><td width=60%><p class="itemRefreshLabel">Refreshed:&nbsp;&nbsp {itemsRefreshed}</p></td></tpl>'+
'</tpl>'+
'<td width=39%><div class="detailText">Refresh Item Detail - </div></td><td width=1%><div class="detail" onClick="refreshOrderLine([\'{parent.documentNumber}\']);"></div></td>'+
'</tr></table></caption><thead>'+
'<tr>'+
'<th scope="col" class="detailTH portCOLa">'+htmlSpacePadding(1,'')+'</th>'+
'<th scope="col" class="detailTH portCOLb">'+htmlSpacePadding(1,'')+'</th>'+
'<th scope="col" class="detailTH portCOLc">'+htmlSpacePadding(6,'')+'Product</th>'+
'<th scope="col" class="detailTH portCOLd">'+htmlSpacePadding(3,'')+'Qty</th>'+
'<th scope="col" class="detailTH portCOLe">'+htmlSpacePadding(23,'')+'Description</th>'+
'<th scope="col" class="detailTH portCOLf">'+htmlSpacePadding(9,'')+'Total Price <br> Unit Price</th>'+
'<th scope="col" class="detailTH portCOLg">'+htmlSpacePadding(5,'')+'Status</th>'+
'<th scope="col" class="detailTH portCOLh">'+htmlSpacePadding(7,'')+'Shipped / Remain Qty</th>'+
'</tr>'+
'</thead>'+
'<tbody>'+
'<tpl for="orderItems">'+
'<tr>'+
'<td class="detailTD"><div class="delivery" onClick="displayOrderItemDelivery(\'{parent.documentNumber}\',\'{product}\',\'{shippedFrom}\',\'{totalLineVolume} {unitOfVolume}\', \'{totalLineWeight} {unitOfWeight}\');"></div></td>'+
'<td class="detailTD">{numberIntTrim}</td>'+
'<td class="detailTD">{productNoTrim}</td>'+
'<td class="detailTD">{quantityTrim} {unit}</td>'+
'<td class="detailTD">{descriptionTrim}</td>'+
'<td class="detailTD">{itemValueTrim} {currency}<br>{netPriceTrim} /{netQuantPriceUnit} {netPriceUnit}</td>'+
'<td class="detailTD">{status}</td>'+
'<td class="detailTD">{deliveredQty}/{Quantitytodeliver}</td>'+
'</tr>'+
'</tpl>'+
'</tbody>'+
'</table></left><p class="refreshLabel">Rotate To Landscape For Additional Information</p>'+

//'<tpl if="hasItems!=1">'+
//'<p class="itemReloadIndicator">This order has no downloaded items click here to get them</p><p>&nbsp</p>'+
//'<center><div class="detail" onClick="refreshOrderLine([\'{parent.documentNumber}\']);"></div></center>'+
//'</tpl>'+
'</div>'+
'</tpl>'+
'<!-- Column 2 end -->'+ 
'</div></div></div>';


mobilens.xTplItemDelivery  =  '<tpl for="."><table class="xTplItemDelivery" border=1 align=center width=100%>'+
'<table  table align=center width=100% border=0 class="detailT" >'+
'<caption class="detailC">'+
'<tpl if="trackingURL != \'\' && trackingURL != \'NA\' && trackingURL != \'N/A\' && trackingURL != \'na\' && trackingURL != \'n/a\'"><div><br><p class="xTplItemDelivery" onClick="displayTargetURL( \'{trackingURL}\', \'Tracking Info\');">Tracking Number: <span class="xTplItemDeliveryLink">'+
'<tpl if="trackingNo != \'\'"> {trackingNo} </tpl>'+
'<tpl if="trackingNo == \'\'">Tap Here To Track </tpl></span>'+
'</caption><thead>'+

'<tr>'+
'<th scope="col" class="detailTH">DeliveryNo</td>'+
'<th scope="col" class="detailTH">Position</td>'+
'<th scope="col" class="detailTH">ObjectId</td>'+
'<th scope="col" class="detailTH">Carrier</td>'+
'<th scope="col" class="detailTH">Actual Ship Date</td>'+
'<th scope="col" class="detailTH">Planned Ship Date</td>'+
'<th scope="col" class="detailTH">Qty UOM</td>'+
'</tr>'+
'</thead>'+

'<tr>'+
'<td class="detailTD">{deliveryNo}</td>'+
'<td class="detailTD">{deliveryPosition}</td>'+
'<td class="detailTD">{objectId}</td>'+
'<td class="detailTD">{carrier}</td>'+
'<td class="detailTD">{actualShippingDate}</td>'+
'<td class="detailTD">{plannedSippingtDate}</td>'+
'<td class="detailTD">{quantity} {unitOfMeasurement}</td>'+
'</tr></table>'+
'</tpl>';



mobilens.xTplShipToPrimary = '<tpl for=".">'+
'<p class="xTplShipTo">'+
'<tpl if="isSelected==1"><b> X &nbsp &nbsp </b></tpl>'+
'{firstName} [ {customerId} ][{salesOrg}][{division}] {city}</p>'+
'</tpl>';


mobilens.xTplDaysOfHistory =  '<tpl for="."><p class="xTplDaysOfHistory">{isSelected} Days Of History</p>'+
'<tpl if="customerName==\'Success\'"><p class="tplLastLoginLabel"> &nbsp </p><p class="tplLastLoginSuccess">Last Login Status: {customerName} </p></tpl>'+
'<tpl if="customerName!=\'Success\'"><p class="tplLastLoginLabel">Last Login Status: </p><p class="tplLastLoginFail">{customerName} </p></tpl>'+
'</tpl>';




mobilens.xTplSoldToPrimary = '<p class="xTplSoldTo"><tpl for=".">{customerName} [ {customerNo} ] {customerCity}</tpl></p>';
mobilens.xTplMsgWait =  '<p class="xTplMsgWait"><tpl for=".">{msg1}</tpl></p><div class="SAMprogress"></div>';
mobilens.xTplMsgNoDelivery =  '<p class="xTplMsgWait"><tpl for=".">{msg2}</tpl></p>';



