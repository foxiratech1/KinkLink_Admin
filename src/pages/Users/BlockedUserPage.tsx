import BlockedUsersComponent from "../../components/users/BlockedUserComp";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

const BlockedUsersPage = () => {
    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

            <PageBreadcrumb
                pageTitle="User Management"
                description="Manage Blocked registered users across the platform"
            />
            <BlockedUsersComponent />
        </div>
    );
};

export default BlockedUsersPage;
