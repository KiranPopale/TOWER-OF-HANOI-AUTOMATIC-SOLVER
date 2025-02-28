const colorArray=["red","green","blue","orange","purple","pink"];

var baselevel=82;
var baseWidth=18;
var n=0;
var steps;
var currentStep=1;
var currentDiscArray=[0,1,1,1,1,1];
var evenSteps=[0,2,3,1];
var oddSteps=[0,3,1,2];
var baselevelArray=[0,82,82,82];

var selectorbtn=document.querySelector("#selectorButton");
selectorbtn.addEventListener("click",()=>{
    selectorbtn.disabled=true;
    n=(document.querySelector("#discNums")).value;
    discCreation();
});

// n DISC CREATION
function discCreation(){
    for(var i=0;i<n;i++)
    {
        var disc=document.createElement("div");
        disc.setAttribute("class","discs");
        disc.setAttribute("Id",2**(n-i-1));
        disc.setAttribute("name",i+1);
        disc.style.height="5vh";
        disc.style.width=baseWidth-(i*3)+"vw";
        disc.style.backgroundColor=colorArray[i];
        disc.style.position="absolute";
        disc.style.top=(baselevel-(5)*i+"vh");
        loc=document.querySelector("#peg1");
        disc.style.left=(loc+i*1.5)+"vw";
        //disc.style.left=(loc+i*1.5)+"px";
        baselevelArray[1]-=5;
        document.querySelector(".peg").append(disc);
        steps=2**n-1;

    }
}

 function discSelect(currentStep)
 {
    if(currentStep%2==1)
        return(1);
    else if(currentStep==2**4 || currentStep%(2**4)==0 )
        return(16);
    else if(currentStep==2**3 || currentStep%(2**3)==0 )
        return(8);
    else if(currentStep==2**2 || currentStep%(2**2)==0 )
        return(4);
    else
        return(2);
 } 

function nextPeg(disc,curpeg){
    if(parseInt(disc.getAttribute("name"))%2==0)
    {  return(evenSteps[curpeg]); }
    else
    {  return(oddSteps[curpeg]);}
}


function start(){
    
    currentDisc=discSelect(currentStep);

    var disc=document.getElementById(currentDisc);
    var discNum= parseInt(disc.getAttribute("name"));
    
    var curpeg=currentDiscArray[parseInt(disc.getAttribute("name"))];

    var nxtpeg=nextPeg(disc,curpeg);

    console.log("Disc= ",currentDisc);
    console.log("currpeg=",curpeg,"nextpeg=",nxtpeg);

    var flag=1;
    var temp1,temp2;

    var towerarray=[0,"#tower1","#tower2","#tower3"];
    loc=document.querySelector(towerarray[nxtpeg]);

    var pegarray=[0,"#peg1","#peg2","#peg3"];
    locpeg=document.querySelector(pegarray[nxtpeg]);
    
    var id=setInterval(anim,1);

    function anim(){ 
        if(parseInt(disc.style.top)>30 && flag==1){ 
            temp1=parseInt(disc.style.top);
            temp1--;
            disc.style.top=temp1+"vh";
            if(temp1==30){
                baselevelArray[curpeg]+=5;
                flag=2;
                temp2=parseInt(disc.offsetLeft);
            }
        }
        else if((temp2!==locpeg.offsetLeft) && flag==2){
            temp2=parseInt(disc.offsetLeft);
            if(temp2<locpeg.offsetLeft)
                temp2++;
            else
                temp2--;

            disc.style.left=temp2+"px"; 
             
            if(temp2==locpeg.offsetLeft){
                var val=1.5*discNum;
                disc.style.transform=`translateX(${val}vw)`;
                flag=3;
                //disc.style.left=46+"vw"; 
            }
        }
        else if(parseInt(disc.style.top)!==baselevelArray[nxtpeg] && flag==3){
            var temp=parseInt(disc.style.top);
            temp++;
            disc.style.top=temp+"vh";
            if(temp==baselevelArray[nxtpeg]){ 
                flag=0; 
                baselevelArray[nxtpeg]-=5; 
                currentDiscArray[parseInt(disc.getAttribute("name"))]=nxtpeg;
                console.log(currentDiscArray);
            } 
            
        }
        else{
            clearInterval(id);

            console.log("Step "+currentStep+" Complete");
            if(currentStep<steps)
            {
                currentStep++;
                start();
            }
        }
    }

}
