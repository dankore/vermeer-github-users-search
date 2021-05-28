// THIS FILE CONTAINS DEFAULT SEO WHICH MEANS THIS SEO WILL BE AVAILABLE ON ALL
// PAGES IN THIS APP

const title = 'Vermeer Github Users Search';
const description = `The goal of this exercise is to create a web app that re-implements a portion of GitHub's Search
feature, the user search, using their public API.`;
const imageUrl = 'https://res.cloudinary.com/dankoresoftware/image/upload/v1618799691/sample.jpg';

const SEO = {
    title,
    description,
    canonical: 'https://vermeer-github-users-search.dankore.com',
    openGraph: {
        type: 'website',
        locale: 'en_IE',
        url: 'https://vermeer-github-users-search.dankore.com',
        title,
        description,
        images: [
            {
                url: imageUrl,
                alt: title,
                width: 1200,
                height: 700,
            },
        ],
    },
    twitter: {
        handle: '@adamuMdankore',
        site: 'vermeer-github-users-search.dankore.com',
        cardType: 'summary',
        image: imageUrl,
    },
};

export default SEO;
