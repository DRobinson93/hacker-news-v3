import Layout from "./../components/layouts/Main";
import PageTitleAndDescription from "./../components/common/PageTitleAndDescription";

function PageNotFound() {
    return (
        <Layout>
            <PageTitleAndDescription title="Page Not Found" description={["Ops, this page was not found."]} />
        </Layout>
    )
}

export default PageNotFound;