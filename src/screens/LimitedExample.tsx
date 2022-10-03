import Layout from "./../components/layouts/Main";
import PageTitleAndDescription from "./../components/common/PageTitleAndDescription";

function LimitedExample() {
    const description : string[] = [
        "This is limited code for a code example",
        "All links on the left besides 'Home' are read only",
        "This code uses React, Typescript and Tailwind. I made a spa that uses virtualization to recreate a read only version of https://news.ycombinator.com/"
    ]
    return (
        <Layout>
            <PageTitleAndDescription title="Info" description={description} />
        </Layout>
    )
}

export default LimitedExample;