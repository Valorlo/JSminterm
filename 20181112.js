var data;

function loaddata(callback){
    var xhr=new XMLHttpRequest();
    xhr.open('get',"https://work1999.kcg.gov.tw/open1999/ServiceRequestsQuery.asmx/ServiceRequestsQuery");

    xhr.send();
    xhr.onload=function(){
        data=JSON.parse(xhr.responseText);
        callback();
    }
}

function sel(){
    var lcn={};
    for(var i=0;i<data.length;i++){
        var content=data[i].ZipName_;
        if(lcn[content]==undefined)
        lcn[content]=1;
    }

    var lcni=document.querySelector(".area");
    var stra='';
    stra+='<option value="all">請選擇地區</option>';
    for(var j in lcn){
        stra+='<option value="'+j+'">'+j+'</option>';
    }
    lcni.innerHTML=stra;

    var stn={};
    for(var i=0;i<data.length;i++){
        var content=data[i].InformDesc_;
        if(stn[content]==undefined)
        stn[content]=1;
    }

    var stni=document.querySelector(".status");
    var strb='';
    strb+='<option value="all">請選擇類型</option>';
    for(var j in stn){
        strb+='<option value="'+j+'">'+j+'</option>';
    }
    stni.innerHTML=strb;

    var btn=document.querySelector(".cl");
    btn.addEventListener('click',update);
}

function update(){
    var lcnin=document.querySelector(".area");
    var stnin=document.querySelector(".status");
    var ti=document.querySelector(".t");
    var tiii=document.querySelector(".t2");
    var vi=document.querySelector('.v');
    var cti=document.querySelector(".ct");
    var total=0;
    var strc='';

    for(var i=0;i<data.length;i++){
        if(data[i].ZipName_==lcnin.value&&data[i].InformDesc_==stnin.value){
            strc+='<li><h4>地點：'+data[i].address_+'</h4></li><h5>報案狀況：'+
            data[i].BeforeDesc_+'</h5>';
            total+=1;
        }
    }
    ti.textContent='全部 '+stnin.value+' 有 ';
    vi.textContent=total;
    tiii.textContent='處';
    cti.innerHTML=strc;
}

loaddata(sel);