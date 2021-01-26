function SearchCard(props) {
  return(
    <div className="col-12">
      <div className="card card-custom" key={props.id}>
        <div className="card-body">
          <h5 className="card-title">{props.item}</h5>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item card-bg-color">
              <div className="row">
                <div className="col-2"><a><object data="https://riskid.tech/dietPedia/img/done.png" width="27" height="27"> </object></a></div>
                <div className="col-3"><a>Brand</a></div>
                <div className="col-7"><a>{props.brand}</a></div>
              </div>
          </li>
          <li className="list-group-item card-bg-color">
              <div className="row">
                <div className="col-2"><object data="https://riskid.tech/dietPedia/img/Steak.png" width="27" height="27"> </object></div>
                <div className="col-3"><a>Porsi</a></div>
              <div className="col-7"><a>{props.porsi}</a></div>
              </div>
          </li>
          <li className="list-group-item card-bg-color">
              <div className="row">
                <div className="col-2"><object data="https://riskid.tech/dietPedia/img/Pizza.png" width="27" height="27"> </object></div>
                <div className="col-3"><a>Kalori</a></div>
              <div className="col-7"><a>{props.kalori} kal</a></div>
              </div>
          </li>
          <li className="list-group-item card-bg-color">
              <div className="row">
                <div className="col-2"><object data="https://riskid.tech/dietPedia/img/Love.png" width="27" height="27"> </object></div>
                <div className="col-3"><a>Lemak</a></div>
                <div className="col-7"><a>{props.lemak} mg</a></div>
              </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SearchCard;
