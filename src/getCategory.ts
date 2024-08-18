const dico_age: { [key: string]: number[] } = {"SEN":[20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35],
    "JUN":[18,19],"SCO":[16,17],"CAD":[14,15],"MIN":[12,13],"PUP":[10,11],"BEN":[8,9],"KAN":[1,2,3,4,5,6,7]}
    

export function getCategory(
    birthDate: Date,
    competitionDate: Date,
    gender: string
): string {
    const age: number = competitionDate.getFullYear() - birthDate.getFullYear();
    console.log("age", age);
    if (age < 35) {
        const yearsDiff = competitionDate.getUTCFullYear() + (competitionDate.getUTCMonth() > 10 ? 1 : 0) 
                        - birthDate.getUTCFullYear();
        for (const key in dico_age) {
            if (dico_age[key].includes(yearsDiff)) {
                return `${key} ${gender}`;
            }
        }
    } else {
        return `${gender == "M" ? "M" : "W"}${parseInt((age / 5).toString()) * 5}`;
    }

    return "";
}
