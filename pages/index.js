import React from 'react'
import MainGrid from "../src/components/MainGrind"
import Box from "../src/components/Box"
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from "../src/Lib/kutCommons"
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations"

import Background from '../src/components/Background'

function ProfileSidebar(props) {
  //console.log(props)
  return (
    <Box as="aside">
      <img src={`https://github.com/${props.githubUser}.png`} alt="foto" style={{ borderRadius: '50%' }} />
      <hr/>
       
      <p>
        <a className="boxLink" href={`https://github.com/${props.githubUser}`}>
          @{props.githubUser}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault/>
    </Box>
  )
}

function ProfileRelationsBox(props) {
  return(
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {props.title} ({props.items.length}) 
      </h2>

      <ul>
        {/*   {seguidores.map((item) => {
          return (
            <li key={item}>
              <a href={`https://github.com/${item}.png`} >
                <img src={item.image} alt="" />
                <span>{item.title}</span>
              </a>
            </li>     
          )
        })} */}

      </ul>
    </ProfileRelationsBoxWrapper>
  )
}


export default function Home() {
  const userAlurakut = 'Matheus153'
  const [comunidades, setComunidades] = React.useState([{
    id: '12802378123789378912789789123896123', 
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }])
  // const comunidades = comunidades[0];
  // const alteradorDeComunidades/setComunidades = comunidades[1];

  const favPeople = [
  'danileao',
  'omariosouto',
  'ArianeVCarvalho',
  'maykbrito',
  'filipedeschamps',
  'diego3g' ]

  const [seguidores, setSeguidores] = React.useState([])
  // 0 - Pegar os arrays de dados do github
    React.useEffect(() => {
    // GET
    fetch('https://api.github.com/users/Matheus153/following')
    .then((respostaService) => {
      return respostaService.json();
    })
    .then((respostaCompleta) => {
      setSeguidores(respostaCompleta);
    })

    // API GraphQL
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '7fefaa5165cf21443eaf776297324c',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ "query": `query {
        allComunities{
          id
          imageUrl
          title
          creatorSlug
        }
      }` })
    })
    .then((response) => response.json()) // Pega o retorno do response.json() e já retorna
    .then((respostaCompleta) => {
      const comunidadesDato = respostaCompleta.data.allComunities
      console.log(comunidadesDato)
      setComunidades(comunidadesDato)
    })
    // .then(function (response) {
    //   return response.json()
    // })

  }, [])
  // 1 - criar um box que vai ter um map, baseado nos itens do arrays 
  // que pegamos 



  return (
    <Background>
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
          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>

            <form onSubmit={function handleCriaComunidade(event) {
                event.preventDefault()
                const dadosForm = new FormData(event.target)

                console.log('nameComunity: ', dadosForm.get('title'))
                console.log('url: ', dadosForm.get('image'))

                const comunidade = {
                  id: new Date().toISOString(),
                  title: dadosForm.get('title'),
                  image: dadosForm.get('image')
                }
                const comunidadesAtualizadas = [...comunidades, comunidade]
                setComunidades(comunidadesAtualizadas)
            }}>
              <div>
                <input
                placeholder="Qual o nome da sua comunidade?" 
                name="title" 
                aria-label="Qual o nome da sua comunidade?" />
              </div>
              <div>
                <input
                placeholder="Coloque uma URL para usarmos de capa" 
                name="image" 
                aria-label="Coloque uma URL para usarmos de capa" />
              </div>
            
              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
          
        </div>

        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea'}}>
          <ProfileRelationsBox title="Seguidores" items={seguidores}  />
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({comunidades.length}) 
            </h2>

            <ul>
                {comunidades.map((item) => {
                return (
                  <li key={item.id}>
                    <a href={`/communities/${item.id}`} >
                      <img src={item.imageUrl} alt="" />
                      <span>{item.title}</span>
                    </a>
                  </li>     
                )
              })}

              </ul>
            </ProfileRelationsBoxWrapper>

            <ProfileRelationsBoxWrapper>
              <h2 className="smallTitle">
                Pessoas da Comunidade ({favPeople.length})
              </h2>
              
              <ul>
                {favPeople.map((people) => {
                return (
                  <li key={people}>
                    <a href={`/users/${people}`}>
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
    </Background>
      
  )
}
