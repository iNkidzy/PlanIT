import{_ as I,r as h,a as o,o as k,c as x,w as t,g as y,b as e,d as s,h as O,i as D,F as M,t as q,p as J,j as L,f as H}from"./index-c4cda20f.js";const z=f=>(J("data-v-0b912eed"),f=f(),L(),f),A=z(()=>H("span",{class:"text-h5"},"Update your SpaceFun",-1)),G={__name:"SpacefunView",setup(f){const r=h({spacefuns:{},newName:""}),_=h(!1),i=h(!1),v=async()=>{try{await fetch("http://localhost:5500/api/spaceFun",y()).then(l=>l.json()).then(l=>{r.value.spacefuns=l})}catch(l){console.log(l)}};v();const j=async l=>{await fetch(`http://localhost:5500/api/spaceFun/${l}`,y({method:"DELETE"})).then(a=>a.json()).then(a=>{v(),console.log("SpaceFun deleted successfully!"),console.log("SpaceFun deleted:",a)})},N=async()=>{const l={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:r.value.newName})};await fetch("http://localhost:5500/api/spaceFun/create",y(l)).then(_.value=!1).then(()=>{v()})},d=h(null),$=async l=>{d.value=l,i.value=!0},T=async()=>{fetch(`http://localhost:5500/api/spaceFun/${d.value._id}`,y({method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({spacefun:d.value._id,name:d.value.name})})).then(l=>l.json()).then(l=>{v(),i.value=!1,console.log("SpaceFun updated successfully!"),console.log("spacefun updated:",l),console.log("spacefun id:",d.value._id)}).catch(l=>{console.log(l,"spacefun not updated")})};return(l,a)=>{const w=o("v-card-title"),c=o("v-col"),u=o("v-btn"),m=o("v-card-actions"),U=o("v-divider"),p=o("v-row"),E=o("router-link"),C=o("v-card-item"),S=o("v-card"),F=o("v-text-field"),g=o("v-container"),V=o("v-spacer"),b=o("v-dialog"),P=o("v-card-text");return k(),x(g,null,{default:t(()=>[e(p,{class:"justify-center"},{default:t(()=>[e(S,{"min-width":"70vw",height:"90vh",class:"scroll"},{default:t(()=>[e(p,{class:"justify-space-between headline"},{default:t(()=>[e(c,{cols:"3"},{default:t(()=>[e(w,null,{default:t(()=>[s("My SpaceFuns")]),_:1})]),_:1}),e(c,{cols:"2"},{default:t(()=>[e(m,null,{default:t(()=>[e(u,{variant:"tonal",flat:"",color:"primary",onClick:a[0]||(a[0]=n=>_.value=!0)},{default:t(()=>[s("+ Create New")]),_:1})]),_:1})]),_:1}),e(U,{class:"border-opacity-95"})]),_:1}),(k(!0),O(M,null,D(r.value.spacefuns,n=>(k(),x(C,{key:n._id},{default:t(()=>[e(p,{class:"justify-space-between headline"},{default:t(()=>[e(c,{cols:"3"},{default:t(()=>[e(E,{to:`/projects/${n._id}`},{default:t(()=>[s(q(n.name),1)]),_:2},1032,["to"])]),_:2},1024),e(c,{cols:"3",class:"align-self-end"},{default:t(()=>[e(m,null,{default:t(()=>[e(u,{variant:"tonal",flat:"",color:"info",onClick:B=>$(n)},{default:t(()=>[s("Edit")]),_:2},1032,["onClick"]),e(u,{variant:"tonal",flat:"",color:"error",onClick:B=>j(n._id)},{default:t(()=>[s("Delete")]),_:2},1032,["onClick"])]),_:2},1024)]),_:2},1024)]),_:2},1024)]),_:2},1024))),128))]),_:1}),e(b,{modelValue:_.value,"onUpdate:modelValue":a[4]||(a[4]=n=>_.value=n),persistent:"",width:"500"},{default:t(()=>[e(S,null,{default:t(()=>[e(w,{class:"text-h5"},{default:t(()=>[s(" Create new SpaceFun ")]),_:1}),e(C,null,{default:t(()=>[e(g,null,{default:t(()=>[e(p,null,{default:t(()=>[e(c,{cols:"12"},{default:t(()=>[e(F,{modelValue:r.value.newName,"onUpdate:modelValue":a[1]||(a[1]=n=>r.value.newName=n),label:"Please enter a title for your SpaceFun","hide-details":"auto",variant:"underlined"},null,8,["modelValue"])]),_:1})]),_:1})]),_:1})]),_:1}),e(m,null,{default:t(()=>[e(V),e(u,{color:"red-darken-1",variant:"tonal",onClick:a[2]||(a[2]=n=>_.value=!1)},{default:t(()=>[s(" Close ")]),_:1}),e(u,{color:"green-darken-1",variant:"tonal",onClick:a[3]||(a[3]=n=>N())},{default:t(()=>[s(" Create ")]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),e(b,{modelValue:i.value,"onUpdate:modelValue":a[8]||(a[8]=n=>i.value=n),persistent:"",width:"600"},{default:t(()=>[e(S,null,{default:t(()=>[e(w,null,{default:t(()=>[A]),_:1}),e(P,null,{default:t(()=>[e(g,null,{default:t(()=>[e(p,null,{default:t(()=>[e(c,{cols:"12"},{default:t(()=>[e(F,{modelValue:d.value.name,"onUpdate:modelValue":a[5]||(a[5]=n=>d.value.name=n),variant:"underlined",label:"Please eneter the new name",required:""},null,8,["modelValue"])]),_:1})]),_:1})]),_:1})]),_:1}),e(m,null,{default:t(()=>[e(V),e(u,{color:"red-darken-1",variant:"tonal",onClick:a[6]||(a[6]=n=>i.value=!1)},{default:t(()=>[s(" Close ")]),_:1}),e(u,{color:"green-darken-1",variant:"tonal",onClick:a[7]||(a[7]=n=>T())},{default:t(()=>[s(" Save ")]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1})}}},Q=I(G,[["__scopeId","data-v-0b912eed"]]);export{Q as default};