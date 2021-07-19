import MainGrid from "../src/components/MainGrind"
import Box from "../src/components/Box"
import { AlurakutMenu, OrkutNostalgicIconSet } from "../src/Lib/kutCommons"
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations"

function ProfileSidebar(props) {
  //console.log(props)
  return (
    <Box>
      <img src={`https://github.com/${props.githubUser}.png`} alt="foto" style={{ borderRadius: '50%' }} />
    </Box>
  )
}


export default function Home() {
  const userAlurakut = 'Matheus153'
  const favPeople = [
  'danileao',
  'omariosouto',
  'ArianeVCarvalho',
  'maykbrito',
  'filipedeschamps',
  'diego3g' ]

  return (
    <>
      <AlurakutMenu/>
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea'}}>
          <ProfileSidebar githubUser={userAlurakut}/>
        </div>
        <div className= "welcomeArea" style={{ gridArea: 'welcomeArea'}}>
          
          <Box>
            <h1 className="title">
              Bem-vindo(a)
            </h1>
            
            <OrkutNostalgicIconSet/>

          </Box>
          
        </div>

        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea'}}>

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da Comunidade ({favPeople.length})
            </h2>
            
            <ul>
              {favPeople.map((people) => {
              return (
                <li>
                  <a href={`/users/${userAlurakut}`} key={people}>
                    <img src={`https://github.com/${people}.png`} alt="" />
                    <span>{people}</span>
                  </a>
                </li>     
              )
            })}

            </ul>
          </ProfileRelationsBoxWrapper>
          
        </div>
      </MainGrid>
    </>
  )
}
