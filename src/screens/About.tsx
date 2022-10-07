import Layout from "./../components/layouts/Main";
import PageTitleAndDescription from "./../components/common/PageTitleAndDescription";

function About() {
    const description : string[] = [
        "This is limited, read only, code for a code example",
        "This code uses React, Typescript and Tailwind.",
        "Each page recreates a read only version of https://news.ycombinator.com/",
        "Home uses virtualization and infinite scroll",
        "V4 uses a load more button and adds in a filter input",
    ]
    return (
        <Layout>
            <PageTitleAndDescription title="Info" description={description} />
        </Layout>
    )
}

export default About;