function ArticleCard(props) {
  return(
    <div class="col-12">
      <a href={props.link}>
        <div class="card card-article" key={props.id}>
           <div class="card-body card-body-custom">
           <div class="row">
             <div class="col-5">
                <img class="img-fluid img-article" src={props.thumbnail} alt="..."/>
             </div>
             <div class="col-7 col-article">
               <h6 class="card-title">{props.title}</h6>
               <p class="card-text">
                  <small class="text-muted"><i>sumber <strong>{props.source}</strong></i></small>
               </p>
               </div>
             </div>
            </div>
          </div>
        </a>
      </div>
  );
}

export default ArticleCard;
