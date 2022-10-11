function init(t){
    t/=6000; 
    let c=document.getElementById('canvas'),
        cc=c.getContext('2d'),
        w=c.width=window.innerWidth, 
        h=c.height=window.innerHeight,
        increment=20; 
    cc.clearRect(0,0,w,h);
    cc.globalCompositeOperation='lighter';
    for(let n=0;n<3;n++){
        if(n==0){
            cc.fillStyle='#f00';
        }
        if(n==1){
            cc.fillStyle='#0f0';
        }
        if(n==2){
            cc.fillStyle='#00f';
        }

        for(let i=0;i<h;i+=increment){
            for(let j=0;j<w/2;j+=increment){
                let index=i*w+j;
                cc.globalAlpha=Math.tan(index*index-t);
                cc.fillRect(
                    Math.tan(i*j-Math.sin(index+n/100)+t)*j+w/2-increment/2,
                    i,
                    Math.tan(index+i/j+t+n/100)/2*increment/2,
                    Math.tan(index*index-t)*increment/2
                );
            }
        }
    }
    
    requestAnimationFrame(init);
}

init();