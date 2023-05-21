import{r as p,a as o,o as i,c,w as t,b as l,d as m,e as V,f,g as C,h as b}from"./index-c4cda20f.js";const k=f("h2",null,"Login",-1),$={__name:"LoginComponents",emits:["cancel"],setup(y){const e=p({users:[],user:{username:"",password:"",role:""}}),u=p(!1),_=async()=>{if(e.value.user.username===""||e.value.user.password===""){console.log("Please enter username and password");return}if(e.value.users.find(n=>n.username===!e.value.user.username)){alert("Wrong login, please try again");return}if(e.value.users.find(n=>n.email===e.value.user.email)){alert("Wrong login, please try again");return}const s={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:e.value.user.username,password:e.value.user.password})};await fetch("http://localhost:5500/api/user/login",s).then(n=>n.json()).then(n=>{console.log(n);const r=n.data.token;localStorage.setItem("token",r),JSON.parse(atob(r.split(".")[1])).role==="ADMIN"?(console.log("admin"),window.location.href="/admin"):(console.log("user"),window.location.href="/spacefun")}).catch(n=>{console.error("Login falied:",n)})};return(s,n)=>{const r=o("v-card-title"),d=o("v-text-field"),v=o("v-btn"),w=o("v-actions"),U=o("v-form"),g=o("v-card");return i(),c(g,{modelValue:u.value,"onUpdate:modelValue":n[4]||(n[4]=a=>u.value=a)},{default:t(()=>[(u.value=!0)?(i(),c(U,{key:0},{default:t(()=>[l(r,{style:{"font-size":"medium"}},{default:t(()=>[k]),_:1}),l(d,{modelValue:e.value.user.username,"onUpdate:modelValue":n[0]||(n[0]=a=>e.value.user.username=a),type:"username",id:"username",label:"Username",required:""},null,8,["modelValue"]),l(d,{modelValue:e.value.user.password,"onUpdate:modelValue":n[1]||(n[1]=a=>e.value.user.password=a),type:"password",id:"password",label:"Password",required:""},null,8,["modelValue"]),l(w,null,{default:t(()=>[l(v,{onClick:n[2]||(n[2]=a=>_())},{default:t(()=>[m("Login")]),_:1}),l(v,{onClick:n[3]||(n[3]=a=>s.$emit("cancel"))},{default:t(()=>[m("Cancel")]),_:1})]),_:1})]),_:1})):V("",!0)]),_:1},8,["modelValue"])}}};const x=f("h2",null,"Create User",-1),N={__name:"SignupComponents",emits:["cancel"],setup(y){const e=p({newUser:{username:"",name:"",email:"",password:""}}),u=async()=>{if(!e.value.newUser.username||!e.value.newUser.name||!e.value.newUser.email||!e.value.newUser.password){alert("Please fill out all fields");return}if(e.value.newUser.password.length<8){alert("Password must be at least 8 characters");return}if(!e.value.newUser.email.includes("@")){alert("Please enter a valid email address");return}if(!e.value.newUser.email.includes(".")){alert("Please enter a valid email address");return}if(e.value.newUser.email.includes("*","!",",","#","$","%","^","&","*","(",")","+","=","?","/","<",">","~","`","[","]","{","}","|",":",";","'",'"',"\\")){alert("Please enter a valid email address");return}if(e.value.newUser.username.length<4){alert("Username must be at least 4 characters");return}if(e.value.newUser.name.length<4){alert("Name must be at least 4 characters");return}const s={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:e.value.newUser.username,name:e.value.newUser.name,email:e.value.newUser.email,password:e.value.newUser.password})};await fetch("http://localhost:5500/api/user/create",C(s)).then(n=>n.json()).then(n=>{console.log("new user created:",n),_(),alert("User created successfully!"),window.location.href="/login"}).catch(n=>{console.log(n,"user not created")})},_=()=>{e.value.newUser.username="",e.value.newUser.name="",e.value.newUser.email="",e.value.newUser.password=""};return(s,n)=>{const r=o("v-card-title"),d=o("v-text-field"),v=o("v-btn"),w=o("v-actions"),U=o("v-form"),g=o("v-card");return i(),c(g,null,{default:t(()=>[l(U,{id:"Forms"},{default:t(()=>[l(r,{style:{"font-size":"medium"}},{default:t(()=>[x]),_:1}),l(d,{modelValue:e.value.newUser.username,"onUpdate:modelValue":n[0]||(n[0]=a=>e.value.newUser.username=a),label:"Username",required:""},null,8,["modelValue"]),l(d,{modelValue:e.value.newUser.name,"onUpdate:modelValue":n[1]||(n[1]=a=>e.value.newUser.name=a),label:"Name",required:""},null,8,["modelValue"]),l(d,{modelValue:e.value.newUser.email,"onUpdate:modelValue":n[2]||(n[2]=a=>e.value.newUser.email=a),label:"Email",required:""},null,8,["modelValue"]),l(d,{modelValue:e.value.newUser.password,"onUpdate:modelValue":n[3]||(n[3]=a=>e.value.newUser.password=a),label:"Password",required:""},null,8,["modelValue"]),l(w,null,{default:t(()=>[l(v,{onClick:n[4]||(n[4]=a=>u())},{default:t(()=>[m("Create a new user account")]),_:1}),l(v,{onClick:n[5]||(n[5]=a=>s.$emit("cancel"))},{default:t(()=>[m("Cancel")]),_:1})]),_:1})]),_:1})]),_:1})}}},S={__name:"WelcomeView",setup(y){const e=p(!1),u=p(!1);return(_,s)=>{const n=o("v-btn");return i(),b("div",null,[f("div",null,[l(n,{onClick:s[0]||(s[0]=r=>e.value=!0)},{default:t(()=>[m("Login")]),_:1}),e.value?(i(),c($,{key:0,onCancel:s[1]||(s[1]=r=>e.value=!1)})):V("",!0)]),f("div",null,[l(n,{onClick:s[2]||(s[2]=r=>u.value=!0)},{default:t(()=>[m("SignUp")]),_:1}),u.value?(i(),c(N,{key:0,onCancel:s[3]||(s[3]=r=>u.value=!1)})):V("",!0)])])}}};export{S as default};
