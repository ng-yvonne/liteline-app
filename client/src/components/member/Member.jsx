import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Member = () => {
    {/*
        Member Icon

        Member Name

        Member Status
            Active, Inactive, Room Admin Active, Room Admin Inactive 
    */}
    return(
        <section class="flex-shrink-0 rounded-full border-2 border-black-300 mt-3">
            <span><AccountCircleIcon /></span>
            <span class="mx-2">John Doe</span>
        </section>
    );
};

export default Member;