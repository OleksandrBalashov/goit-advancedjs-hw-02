import"./assets/modulepreload-polyfill-ec808ebb.js";/* empty css                      */import{i as s}from"./assets/vendor-651d7991.js";const r={form:document.querySelector(".form"),delay:document.querySelector('input[name="delay"]'),step:document.querySelector('input[name="step"]'),amount:document.querySelector('input[name="amount"]')};r.form.addEventListener("submit",m=>{m.preventDefault();const e={};new FormData(r.form).forEach((t,o)=>{e[o]=Number(t)});for(let t=1;t<=e.amount;t+=1)i(t,e.delay).then(({position:o,delay:a})=>{s.show({message:`✅ Fulfilled promise ${o} in ${a}ms`,color:"green",position:"topRight"})}).catch(({position:o,delay:a})=>{s.show({message:`❌ Rejected promise ${o} in ${a}ms`,color:"red",position:"topRight"})}),e.delay=e.delay+e.step;r.delay.value="",r.step.value="",r.amount.value=""});function i(m,e){const n=Math.random()>.3;return new Promise((t,o)=>{setTimeout(()=>{n?t({position:m,delay:e}):o({position:m,delay:e})},e)})}
//# sourceMappingURL=commonHelpers3.js.map