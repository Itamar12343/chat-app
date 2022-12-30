function al(h) {
    alert(h);
}

function con(h) {
    console.log(h);
}

function el(element) {
    var j = document.querySelector(element);
    return j;
}



function recordbtn(startbtn, stopbtn) {
    var device = navigator.mediaDevices.getUserMedia({
        audio: true
    });
    var items = [];
    device.then(stream => {
        var recorder = new MediaRecorder(stream);
        recorder.ondataavailable = e => {
            items.push(e.data);
            if (recorder.state == "inactive") {
                var blob = new Blob(items, {
                    type: 'audio/webm'
                });
                var audio = document.createElement('audio');
                document.body.append(audio);
                audio.setAttribute('controls', 'controls');
                audio.innerHTML = '<source src="' + URL.createObjectURL(blob) + '"type="video/webm"/>';

                //console.log(blob);
            }
        }


        startbtn.addEventListener('click', () => {
            recorder.start();

        });

        stopbtn.addEventListener('click', () => {
            recorder.stop();
        });
        /*setTimeout(() => {
            recorder.stop();
        }, 2000);*/
    });


}




function record(btn) {
    var countrecorderstate = 0;
    var device = navigator.mediaDevices.getUserMedia({
        audio: true
    });
    var items = [];
    device.then(stream => {
        var recorder = new MediaRecorder(stream);
        recorder.ondataavailable = e => {
            items.push(e.data);
            if (recorder.state == "inactive") {
                var blob = new Blob(items, {
                    type: 'audio/webm'
                });
                var audio = document.createElement('audio');
                document.body.append(audio);
                audio.setAttribute('controls', 'controls');
                audio.innerHTML = '<source src="' + URL.createObjectURL(blob) + '"type="video/webm"/>';

                //console.log(blob);
            }
        }


        btn.addEventListener('click', () => {
            if (countrecorderstate == 0) {
                recorder.start();
                setTimeout(() => {
                    countrecorderstate = 1;
                }, 100);
            }

            if (countrecorderstate == 1) {
                recorder.stop();
                setTimeout(() => {
                    countrecorderstate = 0;
                }, 100);
            }
        });

        /*setTimeout(() => {
            recorder.stop();
        }, 2000);*/
    });


}



function atr(el, first, second) {
    var h = el.setAttribute(first, second);
    return h;
}


function reload() {
    window.location.reload();
}



function hide(el, time) {
    if (time == undefined) {
        time = 400;
    }
    el.style.transition = time + "ms" + "";
    el.style.opacity = "0";
    setTimeout(() => {
        el.style.visibility = "hidden";
    }, time);
}


function hideD(el, time) {
    if (time == undefined) {
        time = 400;
    }
    el.style.transition = time + "ms" + "";
    el.style.opacity = "0";
    setTimeout(() => {
        el.style.display = "none";
    }, time);
}

function show(el, time) {
    if (time == undefined) {
        time = 400;
    }
    el.style.transition = time + "ms" + "";
    el.style.visibility = "visible";
    setTimeout(() => {
        el.style.opacity = "100%";
    }, time);
}


function showD(el, time) {
    if (time == undefined) {
        time = 400;
    }
    el.style.transition = time + "ms" + "";
    el.style.display = "inline-block";
    setTimeout(() => {
        el.style.opacity = "100%";
    }, time);
}

function openS(url) {
    window.open(url, "_self");
}

function openN(url) {
    window.open(url);
}


function onhover(el, action, time) {
    if (time == undefined) {
        time = 400;
    }
    el.style.transition = time + "ms" + "";
    el.addEventListener('mouseover', () => {
        action();
    });
}


function onouthover(el, action, time) {
    if (time == undefined) {
        time = 400;
    }
    el.style.transition = time + "ms" + "";
    el.addEventListener('mouseout', () => {
        action();
    });
}



function notif(head, body, icon, timeout) {
    Push.create(head, {
        body: body,
        timeout: timeout,
        icon: icon
    });
}


function delay(time, action) {
    setTimeout(() => {
        action();
    }, time);
}


function onclick(el, action, time) {
    if (time == undefined) {
        time = 250;
    }
    el.style.transition = time + "ms" + "";
    el.addEventListener('click', () => {
        action();
    });
}

function generateN() {
    var num = Math.floor((Math.random() * 10) + 1);
    return num;
}

function generateNB(from, to) {
    var num = Math.floor((Math.random() * to) + from);

    while (num > to) {
        var num = Math.floor((Math.random() * to) + from);
    }
    return num;
}