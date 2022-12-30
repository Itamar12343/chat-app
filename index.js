const send = document.querySelector(".send");
const send_ball = document.querySelector(".send-ball");
const file_input = document.querySelector(".file-input");
const camera_btn = document.querySelector(".camera-btn");
const upload_btn = document.querySelector(".upload-btn");
const input = document.querySelector(".input");
const storage_username = localStorage.getItem("username");
let count_loads = 0;
const username = localStorage.getItem("username");
const box_first_letter = document.querySelector(".box-first-letter");
let first_letter;
const box = document.querySelector(".box");
const msgs = document.querySelector(".msgs");
//log out////////
const log_out_box = document.querySelector(".log-out-box");
const box_ball = document.querySelector(".box-ball");
const set_log_out_box = document.querySelector(".set-log-out-box");
const log_out_yes = document.querySelector(".log-out-yes");
const log_out_cancel = document.querySelector(".log-out-cancel");
const spiner = document.querySelector(".set-msgs-spiner");
const send_icon = document.querySelector(".send-icon");
const typingel = document.querySelector(".typing");
////firebase////
const chat = firebase.database().ref("chat");
let setnum = 0;
let getnum = 0;
const get_audio = new Audio("https://drive.google.com/uc?export=download&id=1Q7T0mlW_o22QpFCew45ZqDhEU5A9i7gs");
const send_audio = new Audio("https://drive.google.com/uc?export=download&id=13FPTf7AeVIClo-z1cgAuy1PEuinNNljQ");
let getmsgsfun = "false";

if (username) {
    first_letter = username.split("")[0].toLocaleUpperCase();
}


window.onload = () => {

    send_icon.style.transform = "none";
    send_icon.innerHTML = '<i class="bi bi-mic-fill"></i>';
    send_icon.style.paddingRight = "7px";

    chat.child("number").once('value', function(snapshot) {
        const num = snapshot.val();
        if (num != null) {
            setnum = num.number;
        } else {
            create_emsg("אין הודעות חדשות", "family chat", "new");
        }
    });

    load_msgs();

    msgs.scrollTo(0, 1000000);

    box_first_letter.textContent = first_letter;
    if (localStorage.getItem("count loads")) {
        count_loads = localStorage.getItem("count loads");
    }


    if (storage_username) {
        localStorage.setItem("count loads", Number(count_loads) + 1);
        setTimeout(() => {
            document.body.style.opacity = "1";
            document.body.style.backgroundColor = "#d5f4ff";
        }, 1000);
    } else {
        window.location = "login.html";
    }


    if (localStorage.getItem("count loads") == 1) {
        notif("you are now loged in!", "family chat", "chat.png");
    }
}

send.addEventListener('mousemove', (e) => {
    let x = e.clientX - 490;
    let y = e.clientY - 80;
    send_ball.style.setProperty("--x", x + "px");
    send_ball.style.setProperty("--y", y + "px");
});
send.addEventListener('mousedown', (e) => {
    let x = e.clientX - 490;
    let y = e.clientY - 80;
    send_ball.style.setProperty("--x", x + "px");
    send_ball.style.setProperty("--y", y + "px");
    send_ball.style.transform = "scale(1)";
    send.style.transform = "scale(0.5)";

    setTimeout(() => {
        send_ball.style.transform = "scale(0)";
        send.style.transform = "scale(1)";
    }, 200);
});


upload_btn.onclick = () => {
    upload_btn.style.backgroundColor = "#d5dfff";
    setTimeout(() => {
        upload_btn.style.backgroundColor = "transparent";
        file_input.click();
    }, 300);
}


camera_btn.onclick = () => {
    camera_btn.style.backgroundColor = "#d5dfff";
    setTimeout(() => {
        camera_btn.style.backgroundColor = "transparent";
        window.open("camera.html");
    }, 300);
}


setInterval(() => {

    getnum = Number(setnum) + 1;


    chat.child("typing").once('value', function(snapshot) {
        let typing = snapshot.val();
        if (typing.user != null && typing.user != username) {
            typingel.style.display = "inline-flex";
            setTimeout(() => {
                typingel.style.opacity = "1";
                typingel.textContent = typing.user + " ...מקליד/ה"

                setTimeout(() => {
                    typingel.style.opacity = "0";
                    setTimeout(() => {
                        typingel.style.display = "none";
                    }, 200);
                }, 6000);
            }, 200);
        }
    });



    chat.child(getnum).once('value', function(snapshot) {
        let gotchat = snapshot.val();
        if (gotchat != null && gotchat.sender != username && getmsgsfun == "true") {

            get_audio.play();
            if (gotchat.msg.length > 50) {
                setTimeout(() => {
                    create_eimg(gotchat.msg, gotchat.sender);
                    notif(gotchat.sender, 'image', "chat.png");
                }, 1000);
            } else {
                create_emsg(gotchat.msg, gotchat.sender);
                notif(gotchat.sender, gotchat.msg, "chat.png");
            }
            remove_first_msg();
        }
    });


    chat.child("number").once('value', function(snapshot) {
        const num = snapshot.val();
        if (num != null) {
            setnum = num.number;
        }
    });



    if (localStorage.getItem("snaped img")) {
        create_img(localStorage.getItem("snaped img"));
        send_img(localStorage.getItem("snaped img"));
        localStorage.removeItem("snaped img");
    }


    if (input.value.length > 0) {
        send_icon.style.transform = "rotate(-130deg)";
        send_icon.innerHTML = '<i class="bi bi-send-fill">';
        send_icon.style.paddingRight = "10px";
    } else {
        send_icon.style.transform = "none";
        send_icon.innerHTML = '<i class="bi bi-mic-fill"></i>';
        send_icon.style.paddingRight = "7px";
    }

    if (input.value.length > 0) {
        upload_btn.style.left = "50px";
        upload_btn.style.opacity = "0";
        upload_btn.style.pointerEvents = "none";
        upload_btn.style.transform = "rotate(60deg)";

        setTimeout(() => {
            camera_btn.style.left = "50px";
            camera_btn.style.opacity = "0";
            camera_btn.style.pointerEvents = "none";
            camera_btn.style.transform = "rotate(60deg)";
        }, 200);
    } else {
        upload_btn.style.left = "100px";
        upload_btn.style.opacity = "1";
        upload_btn.style.pointerEvents = "all";
        upload_btn.style.transform = "rotate(0deg)";

        setTimeout(() => {
            camera_btn.style.left = "136px";
            camera_btn.style.opacity = "1";
            camera_btn.style.pointerEvents = "all";
            camera_btn.style.transform = "rotate(0deg)";
        }, 200);
    }
}, 300);

box_ball.onclick = () => {
    set_log_out_box.style.display = "block";
    log_out_box.style.transform = "scale(0)";
    setTimeout(() => {
        set_log_out_box.style.opacity = "1";
        setTimeout(() => {
            log_out_box.style.transform = "scale(1.5)";
            setTimeout(() => {
                log_out_box.style.transform = "scale(1)";
                setTimeout(() => {
                    log_out_box.classList.add("log-out-box-animation");
                    box.style.pointerEvents = "none";
                    camera_btn.style.pointerEvents = "none";
                    upload_btn.style.pointerEvents = "none";
                }, 300);
            }, 300);
        }, 100);
    }, 300);
}

log_out_box.addEventListener("mouseover", () => {
    const animation = document.querySelector(".log-out-box-animation");
    animation.style.animationPlayState = "paused";
});

log_out_box.addEventListener("mouseout", () => {
    const animation = document.querySelector(".log-out-box-animation");
    animation.style.animationPlayState = "running";
});

log_out_cancel.onclick = () => {
    set_log_out_box.style.opacity = "0";
    setTimeout(() => {
        log_out_box.classList.remove("log-out-box-animation");
        set_log_out_box.style.display = "none";
        box.style.pointerEvents = "all";
        camera_btn.style.pointerEvents = "all";
        upload_btn.style.pointerEvents = "all";
    }, 200);
}

log_out_yes.onclick = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("count loads");
    setTimeout(() => {
        window.location.reload();
    }, 200);
}





function create_msg(text) {
    let set_msg = document.createElement('div');
    set_msg.style.transform = "scale(0)";
    set_msg.setAttribute('class', 'set-msg');
    msgs.append(set_msg);

    let v = document.createElement('div');
    v.setAttribute('class', 'v');
    v.innerHTML = '<i class="bi bi-check2-all"></i>';
    set_msg.append(v);

    let msg = document.createElement('h1');
    msg.setAttribute('class', 'msg');
    msg.textContent = text;
    set_msg.append(msg);

    let setmsgheight = window.getComputedStyle(set_msg);
    let split = setmsgheight.height.split("");
    let one = split[0];
    let tow = split[1];
    let three = split[2];
    let four = split[3];
    let five = split[4];
    let six = split[5];
    let seven = split[6];
    let all = one + tow + three + four + five + six + seven;
    let alll = Number(all) - 20;

    set_msg.style.height = alll + "px";


    setTimeout(() => {
        set_msg.style.transform = "scale(1.5)";

        setTimeout(() => {
            set_msg.style.transform = "scale(1)";
        }, 250);
    }, 100);


    msgs.scrollTo({
        top: 1000000,
        behavior: "smooth"
    });

}








function remove_first_msg() {
    let msg = document.querySelector(".new");
    msg.style.transition = "0.4s";
    msg.style.transform = "scale(1.2)";
    setTimeout(() => {
        msg.style.transform = "scale(0)";
        setTimeout(() => {
            msg.remove();
        }, 400);
    }, 300);

}





function create_emsg(text, sender_id, classs) {
    let set_emsg = document.createElement('div');
    set_emsg.style.transform = "scale(0)";
    set_emsg.setAttribute('class', 'set-emsg');
    msgs.append(set_emsg);


    let emsg = document.createElement('h1');
    emsg.setAttribute('class', 'emsg');
    emsg.textContent = text;
    set_emsg.append(emsg);

    set_emsg.classList.add(classs);


    let sender = document.createElement('div');
    sender.setAttribute('class', 'sender');
    sender.textContent = sender_id;
    set_emsg.append(sender);

    let setmsgheight = window.getComputedStyle(set_emsg);
    let split = setmsgheight.height.split("");
    let one = split[0];
    let tow = split[1];
    let three = split[2];
    let four = split[3];
    let five = split[4];
    let six = split[5];
    let seven = split[6];
    let all = one + tow + three + four + five + six + seven;
    let alll = Number(all) - 20;

    let margin = Number(alll) / 4;

    set_emsg.style.marginRight = 30 + "px";

    if (text.length > 40) {
        //set_emsg.style.height = alll - 70 + "px";
        set_emsg.style.marginLeft = margin - 20 + "px";
    } else {
        //set_emsg.style.height = alll - 30 + "px";
        set_emsg.style.marginLeft = margin + 150 + "px";
    }


    setTimeout(() => {
        set_emsg.style.transform = "scale(1.5)";

        setTimeout(() => {
            set_emsg.style.transform = "scale(1)";
        }, 250);
    }, 100);


    msgs.scrollTo({
        top: 1000000,
        behavior: "smooth"
    });

}


function create_img(img_input) {
    let set_img = document.createElement('div');
    set_img.style.transform = "scale(0)";
    set_img.setAttribute('class', 'set-img');
    msgs.append(set_img);

    let img = document.createElement('div');
    img.setAttribute('class', 'img');
    set_img.append(img);
    img.style.backgroundImage = `url(${img_input})`;

    let img_v = document.createElement('div');
    img_v.setAttribute('class', 'img-v');
    img_v.innerHTML = '<i class="bi bi-check2-all"></i>';
    set_img.append(img_v);


    setTimeout(() => {
        set_img.style.transform = "scale(1.5)";

        setTimeout(() => {
            set_img.style.transform = "scale(1)";
        }, 250);
    }, 100);

    msgs.scrollTo({
        top: 1000000,
        behavior: "smooth"
    });
    //remove_first_msg();
}



function create_eimg(img_input, sender_id) {
    let set_eimg = document.createElement('div');
    set_eimg.style.transform = "scale(0)";
    set_eimg.setAttribute('class', 'set-eimg');
    msgs.append(set_eimg);

    let sender = document.createElement('div');
    sender.setAttribute('class', 'sender');
    sender.textContent = sender_id + "";
    set_eimg.append(sender);

    let eimg = document.createElement('div');
    eimg.setAttribute('class', 'eimg');
    eimg.style.backgroundImage = `url(${img_input})`;
    set_eimg.append(eimg);

    setTimeout(() => {
        set_eimg.style.transform = "scale(1.5)";

        setTimeout(() => {
            set_eimg.style.transform = "scale(1)";
        }, 250);
    }, 100);

    msgs.scrollTo({
        top: 1000000,
        behavior: "smooth"
    });
    //remove_first_msg();
}



function send_msg(text) {
    setnum++;

    chat.child("number").set({
        number: setnum
    });

    chat.child(setnum).set({
        msg: text,
        sender: username
    });
}



function send_img(img) {
    setnum++;

    chat.child("number").set({
        number: setnum
    });

    chat.child(setnum).set({
        msg: img,
        sender: username
    });
}



function load_msgs() {
    for (let i = 0; i < 1000; i++) {
        chat.child(i).once('value', function(snapshot) {
            const msg = snapshot.val();
            if (msg != null) {

                if (msg.sender == username) {

                    if (msg.msg.length > 50) {
                        create_img(msg.msg);
                    } else {
                        create_msg(msg.msg);
                    }

                } else {
                    if (msg.msg.length > 50) {
                        create_eimg(msg.msg, msg.sender);
                    } else {
                        create_emsg(msg.msg, msg.sender);
                    }
                }

            } else {
                setTimeout(() => {
                    spiner.style.opacity = "0";
                    msgs.style.opacity = "1";
                    setTimeout(() => {
                        spiner.style.display = "none";
                        getmsgsfun = "true";
                    }, 500);
                }, 2000);
            }
        });
    }

}




send.onclick = () => {
    if (input.value.length > 0) {
        send_audio.play();
        create_msg(input.value);
        send_msg(input.value);
        input.value = '';
        send_audio.play();
        remove_first_msg();
    }
}



file_input.addEventListener('change', () => {
    const reader = new FileReader();

    reader.onload = () => {
        let file = reader.result;
        send_audio.play();
        create_img(file);
        send_img(file);
    }
    reader.readAsDataURL(file_input.files[0]);
});


input.addEventListener('keydown', () => {

    setTimeout(() => {
        chat.child("typing").set({
            user: username
        });

        setTimeout(() => {
            chat.child("typing").remove();
        }, 6000);
    }, 1000);

});