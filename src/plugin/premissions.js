export const  deepTree=(auth)=> {
  const routes = auth.map((d) => {
    if (d?.children) {
      return {
        icon: d.meta.icon,
        path: d.path,
        name: d.meta.pathName,
        permissions: d.meta.permissions || [],
        children: deepTree(d.children),
      };
    } else {
      return {
        icon: d.meta.icon,
        path: d.path,
        name: d.meta.pathName,
        permissions: d.meta.permissions ||[],
      };
    }
  });

  return routes;
}
// const isPermissions = ({meta},permissions)=>{
//   // 不含meta或者meta中不含permissions的所有登录用户均可见
//   if(!meta || !meta.permissions){
//     return true
//   }else {
//     // meta.permissions的任意一项在permissions中出现
//     return meta.permissions.some(d=>permissions.includes(d))
//   }
// }
export const filterMenus = (auth,permissions)=>{
  // console.log(auth, permissions);
  const menus = [auth[0]];
  auth.slice(1).forEach(d => {
    let flag = d.children.some((g) => permissions.includes(g.permissions[0]));
    if(flag){
      menus.push(d)
    }
  });
  return menus;
}
