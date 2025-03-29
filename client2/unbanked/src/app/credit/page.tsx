import LoanOverview from "@/components/loan/loan-overview";
import ConnectAccount from "@/components/home/connect-account";
import Header from "@/components/ui/Header";

const Credit = () => {
    return (
        <>
            <ConnectAccount />
            <div className="pt-2">
                    <Header />
                    <div className="pt-5 px-4">
                    <LoanOverview/>
                    </div>
                </div>
            <p>Credit page</p>
        </>
    );
};

export default Credit;
