(function(){
  "use strict";

  var year=document.getElementById("year");
  if(year)year.textContent=new Date().getFullYear();

  var reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* --------------- modais (privacidade e termos de uso) --------------- */
  var closeModals=function(){
    document.querySelectorAll(".modal.is-open").forEach(function(el){el.classList.remove("is-open");});
    document.body.style.overflow="";
  };
  document.querySelectorAll("[data-modal-open]").forEach(function(trigger){
    trigger.addEventListener("click",function(){
      var target=document.getElementById(trigger.getAttribute("data-modal-open"));
      if(!target)return;
      closeModals();
      target.classList.add("is-open");
      document.body.style.overflow="hidden";
      var close=target.querySelector("[data-modal-close]");
      if(close)close.focus();
    });
  });
  document.querySelectorAll(".modal").forEach(function(modal){
    modal.addEventListener("click",function(event){if(event.target===modal)closeModals();});
  });
  document.querySelectorAll("[data-modal-close]").forEach(function(el){el.addEventListener("click",closeModals);});
  document.addEventListener("keydown",function(event){if(event.key==="Escape")closeModals();});

  /* ---------------------- revelação no scroll ---------------------- */
  var reveals=document.querySelectorAll(".reveal");
  if("IntersectionObserver" in window && !reduced){
    var observer=new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){entry.target.classList.add("is-visible");observer.unobserve(entry.target);}
      });
    },{threshold:.12,rootMargin:"0px 0px -35px"});
    reveals.forEach(function(el){observer.observe(el);});
  }else{
    reveals.forEach(function(el){el.classList.add("is-visible");});
  }

  /* ------------- regiões ancoradas: troca conforme o scroll ------------- */
  var section=document.querySelector(".steps");
  var scroller=section&&section.querySelector(".steps__scroll");
  var steps=section?section.querySelectorAll(".step"):[];

  if(section&&scroller&&steps.length){
    var pinned=false,ticking=false;

    function enable(){
      var wide=window.matchMedia("(min-width: 981px)").matches && window.innerHeight>620;
      if(wide===pinned)return;
      pinned=wide;
      section.classList.toggle("is-pinned",pinned);
      if(!pinned)steps.forEach(function(s){s.classList.add("is-active");});
      else update();
    }

    function update(){
      if(!pinned)return;
      var box=scroller.getBoundingClientRect();
      var total=box.height-window.innerHeight;
      var progress=total>0?Math.min(Math.max(-box.top/total,0),1):0;
      var index=Math.min(Math.floor(progress*steps.length),steps.length-1);
      steps.forEach(function(step,i){step.classList.toggle("is-active",i===index);});
    }

    window.addEventListener("scroll",function(){
      if(ticking)return;
      ticking=true;
      requestAnimationFrame(function(){update();ticking=false;});
    },{passive:true});

    window.addEventListener("resize",function(){enable();update();});
    enable();
  }

  /* --------------------------- formulário --------------------------- */
  var phone=document.getElementById("whatsapp");
  if(phone)phone.addEventListener("input",function(){
    var v=this.value.replace(/\D/g,"").slice(0,11);
    if(v.length>6)this.value="("+v.slice(0,2)+") "+v.slice(2,v.length===11?7:6)+"-"+v.slice(v.length===11?7:6);
    else if(v.length>2)this.value="("+v.slice(0,2)+") "+v.slice(2);
    else if(v.length)this.value="("+v;
  });

  // TODO: inserir a URL do webhook/CRM (Make, Zapier, n8n) da Serela Clinic.
  var WEBHOOK_URL="";

  var form=document.getElementById("leadForm");
  if(form)form.addEventListener("submit",function(event){
    event.preventDefault();
    form.querySelectorAll(".is-error").forEach(function(el){el.classList.remove("is-error");});

    var name=document.getElementById("nome");
    var digits=phone.value.replace(/\D/g,"");
    var region=form.querySelector('input[name="regiao"]:checked');
    var goal=form.querySelector('input[name="objetivo"]:checked');
    var valid=true;

    if(name.value.trim().length<2){name.closest(".field").classList.add("is-error");valid=false;}
    if(digits.length<10){phone.closest(".field").classList.add("is-error");valid=false;}
    if(!region){form.querySelector('input[name="regiao"]').closest("fieldset").classList.add("is-error");valid=false;}
    if(!goal){form.querySelector('input[name="objetivo"]').closest("fieldset").classList.add("is-error");valid=false;}
    if(!valid){
      var firstError=form.querySelector(".is-error");
      if(firstError)firstError.scrollIntoView({behavior:"smooth",block:"center"});
      return;
    }

    var button=form.querySelector('button[type="submit"]');
    button.disabled=true;button.textContent="Enviando...";

    var payload={
      nome:name.value.trim(),
      whatsapp:phone.value,
      regiao:region.value,
      objetivo:goal.value,
      protocolo:"Crio HD",
      pagina:location.href,
      data_envio:new Date().toISOString()
    };

    try{sessionStorage.setItem("serelaLead",JSON.stringify(payload));}catch(e){}

    if(!WEBHOOK_URL){location.href="obrigado.html";return;}

    fetch(WEBHOOK_URL,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)})
      .catch(function(error){console.error("Falha no envio:",error);})
      .finally(function(){location.href="obrigado.html";});
  });
})();
