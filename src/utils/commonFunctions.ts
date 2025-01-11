
// for formating time from seconds to hh:mm:ss
export const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
};

export const firstLetterUpper = (str:string) => {
    return (str.slice(0,1).toUpperCase() + str.slice(1));
}

export const getDateAndTime = (date:Date) => {
    return (new Date(date).toString().slice(0,10)) +", "+ (new Date(date).toString().slice(16,21));
}