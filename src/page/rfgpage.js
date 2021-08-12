import Func_filter_find_ingredient from "../components/rfgpage/filter";
import Func_filterresult_filterresult from "../components/rfgpage/filterresult";
import Footer from '../components/mainpage/footer';
import React, { useState, useEffect } from "react";
import Axios from "axios";

// import SearchResult from '../components/SearchResult';

function App({ history,information }) {
  const [toggle, settoggle] = useState(false);
  const [thumb_table, set_thumb_table] = useState();
  const [result_box_list, setresult_box_list] = useState([]);
  const [random_select, set_random_select] = useState([]);

  useEffect(()=>{
    if (random_select.length != 0) {
      Axios.post("https://qkrtmfqls.gabia.io/gettable", {
          id: random_select[0]
      })
      .then((response) => {
        set_thumb_table(response.data);
      })
      .catch((error) => {
          console.log(error);
      });
    }
  }, [random_select]);

  useEffect(async () => {
    await Axios.post("https://qkrtmfqls.gabia.io/getrfg", {
          id: information.id
      })
      .then((response)=> {
          console.log(response)
          let res_igdname = response.data[0].Igdname.split(",");
          let res_eprname = response.data[0].Eprdate.split(",");
          let new_igdname =[];
          const random_select1 = []
          res_igdname && res_igdname.map((v,index)=> {
            if(v !== '') {
              new_igdname.push({result_igdname : v, eprd : res_eprname[index]});
              random_select1.push(v);  
            }
          })
          setresult_box_list(new_igdname);
          random_select1.sort(() => Math.random() - 0.5);
          console.log(random_select1[0])
          set_random_select(random_select1)
      })
      .catch((error)=> {
          console.log(error);
      });
  }, [information]);


  const Func_show_ingredient = () => {
      if (toggle == true) {
      return(
      <div className="rfg-body-form">
        <Func_filter_find_ingredient information={information} result_box_list={result_box_list} setresult_box_list={setresult_box_list}>
        </Func_filter_find_ingredient>
      </div>
      );
    }
  }


  return (
    <>
    <div className="rfg-form">
      
      <div className="rfg-select-btn"><button className = "ingredient-toggle-btn" onClick= {()=>{settoggle(!toggle)}}>{ toggle ? "그만 담고 검색하기" : '내 냉장고에 재료 추가하기'}</button></div>
      {Func_show_ingredient()}
    </div>
    <div className="fg-result-box">
      <Footer ftable={thumb_table} history={history}/>
    </div>
    </>
  );
}

export default App;