const requireAll=(r)=>{
    r.keys().forEach(r);
}

requireAll(require.context('../resources/images/icons',false,/\.svg$/));

