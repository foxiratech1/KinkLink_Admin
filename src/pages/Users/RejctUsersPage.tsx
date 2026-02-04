import RejectUsersComponent from "../../components/users/RejectUsersComp";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

const RejectUsersPage = () => {
    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <PageBreadcrumb
                pageTitle="Reject Users"
                description="Review and approve user registrations"
            />
            <RejectUsersComponent />
        </div>
    );
};

export default RejectUsersPage;
