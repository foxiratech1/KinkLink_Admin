import AllUsersComponent from "../../components/users/AllUsersComponent";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

const AllUsersPage = () => {
    return (

        <div className="mx-auto w-full px-4 py-8 sm:px-6 lg:px-8">

            <PageBreadcrumb
                pageTitle="User Management"
                description="Manage all registered users across the platform"
            />
            <AllUsersComponent />
        </div>
    );
};

export default AllUsersPage;
