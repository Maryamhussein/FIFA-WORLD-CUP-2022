const token="858a36a3fde541a48bbc75045957a29d";
const baseUrl="https://api.football-data.org/v4/competitions/2000";

function getStandings(){
    const url=`${baseUrl}/standings`;
    axios.get(url , {
        headers:{
            "X-Auth-Token":token
        }
    }).then((response)=>{
        let standings=response.data.standings;
        document.getElementById('groups').innerHTML="";
        for(let standing of standings){
            console.log(standing)
            let rowContent='';
            for(item of standing.table){
                console.log(item)
                rowContent+=`
                <li class="list-group-item">
                        <div class="row text-center my-1">
                            <div class="col-lg-4 col-sm-12">
                                <img class="border border-secondary"src=${item.team.crest} alt="" style="width:40px;height:40px;object-fit: cover;border-radius: 50%;margin-right:5px">
                                <span id="country"><b>${item.team.tla}</b></span>
                            </div>
                            <div class="col-lg-2 col-sm-12">${item.won}</div>
                            <div class="col-lg-2 col-sm-12">${item.lost}</div>
                            <div class="col-lg-2 col-sm-12">${item.draw}</div>
                            <div class="col-lg-2 col-sm-12">${item.points}</div>
                        </div>
                      </li>
                `
            }
                let content=`
                <div id="group"class="col-lg-6 col-md-12 col-sm-12 my-2">
                <div class="card" style="width: 26rem;">
                    <div class="card-header text-center" style="background-color: #9a1031;color: white;">
                        <b>${standing.group}</b>
                    </div>
                    <div class="row text-center" style="background-color: #75132a;color: white;">
                        <div class="col-lg-4 col-sm-12">
                            Team
                        </div>
                        <div class="col-lg-2 col-sm-12">W</div>
                        <div class="col-lg-2 col-sm-12">L</div>
                        <div class="col-lg-2 col-sm-12">D</div>
                        <div class="col-lg-2 col-sm-12">PTS</div>
                    </div>
                    <ul class="list-group list-group-flush">
                    ${rowContent}
                    </ul>
                </div>
            </div>
                `
            document.getElementById('groups').innerHTML+=content;
        }
    })
}
function getMatches(){
    const url=`${baseUrl}/matches`;
    axios.get(url , {
        headers:{
            "X-Auth-Token":token
        }
    }).then((response)=>{
        let matches=response.data.matches;
        console.log(matches)
        document.getElementById('matches').innerHTML="";
        for(let match of matches){
           let homeTeam=match.homeTeam;
           let awayTeam=match.awayTeam;
           let matchTime=match.utcDate;
           let matchTimeDate=new Date(matchTime)
           let utcTime=matchTimeDate.getUTCFullYear()+"/"+matchTimeDate.getUTCMonth()+"/"+matchTimeDate.getUTCDay()+ " "+matchTimeDate.getUTCHours()+":"+matchTimeDate.getUTCMinutes()
           let content =`
           <div class="card shadow rounded-pill mb-2" style="overflow: hidden;">
                <div class="row" style="height:120px">
                    <!--First Team-->
                    <div class="col-sm-3 d-flex flex-column justify-content-center align-items-center" style="background-color: #9a1031; border-right: 6px solid #760f27;">
                            <div><img src="${homeTeam.crest}" alt="" style="width:30px;height:30px;object-fit: cover;border-radius: 50%;"></div>
                            <div style="color:white" id="country"><b>${homeTeam.tla}</b></div>
                    </div>
                    <!--// First Team // -->
                    
                    <div class="col-sm-6" >
                    <div class="row">
                    <div class="col-sm-12 d-flex" >
                        <div style="margin:auto 0" class="col-sm-4 d-flex align-items-center justify-content-center">
                            <b>
                            ${match.score.fullTime.home}
                            </b>
                        </div>
                        <div style="margin:auto 0" class="col-sm-4 d-flex flex-column justify-content-center align-items-center">
                             <h3>${match.group ?? "Closeouts"}</h3>
                            <p>X</p>
                             <h5>${utcTime}</h5>
                        </div>
                        <div style="margin:auto 0" class="col-sm-4 d-flex flex-column justify-content-center align-items-center">
                            <b>
                            ${match.score.fullTime.away}
                            </b>
                        </div>
                    </div>
                </div>
                    </div>
                        <!--Second Team-->
                    <div class="col-sm-3 d-flex flex-column justify-content-center align-items-center" style="background-color: #9a1031; border-left: 6px solid #760f27;">
                        <div><img src="${awayTeam.crest}" alt="" style="width:30px;height:30px;object-fit: cover;border-radius: 50%;"></div>
                        <div style="color:white" id="country"><b>${awayTeam.tla}</b></div>
                    </div>
                    <!--// Second Team // -->
                </div>
            </div> 
           `
           document.getElementById("matches").innerHTML+=content;
        }
        
    })
}
getStandings()
getMatches()