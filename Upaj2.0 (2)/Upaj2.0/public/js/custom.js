const profile = document.getElementById('profile');
fetch('/getUserDetail')
        .then((res)=>{
            if(res.status === 200){
                return res.json(); 
            }
            else{
                alert("Something weird happened!!!");
            }
        }).then((data)=>{
             profile.innerHTML=`<img src ="../image/account.png" width="20px"> ${data.username}`;
    });

function logout(){
    fetch('/logout')
        .then((res)=>{
            if(res.status === 200){
                return true;
            }
            else{
                alert("Something weird happened!!!");
                return false;
            }
        })
}