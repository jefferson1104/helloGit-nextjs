import { SiteClient } from 'datocms-client';

export default async function requestReceiver(request, response) {
  if (request.method === 'POST') {
    const TOKEN = 'f98de10c631f0f75603ae8525af285';
    const client = new SiteClient(TOKEN);

    const registerCreated = await client.items.create({
      itemType: "972641",
      ...request.body,
      // title: "GatsbyJS",
      // imageUrl: "https://www.gatsbyjs.com/static/d4ed2bdc92d5aa7991670a394c910cc8/a3df1/vertical-treatment.jpg",
      // creatorSlug: "omariosouto"
    });
  
    response.json({
      data: 'Cadastrado',
      registerCreated: registerCreated,
    });
    return;
  }

  response.status(404).json({
    message: 'Ainda não temos nada no método GET, mas no método POST temos!'
  })
}
