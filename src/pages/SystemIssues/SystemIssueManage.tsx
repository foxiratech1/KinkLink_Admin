import React from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import SystemIssueComp from "../../components/SystemIssues/SystemIssueComp";

const SystemIssueManage: React.FC = () => {
    return (
        <>
            <PageBreadcrumb
                pageTitle="System Status & Severity"
                description="Platform health and stability overview"
            />
            <div className="flex flex-col gap-10">
                <SystemIssueComp />
            </div>
        </>
    );
};

export default SystemIssueManage;
