import { NS } from '@ns'

export async function main(ns: NS): Promise<void> {
    const target = ns.args[0].toString();
    const moneyThresh = ns.getServerMaxMoney(target) * 0.75;
    const securityThresh = ns.getServerMinSecurityLevel(target) + 5;

    ns.brutessh(target);
    ns.httpworm(target);
    ns.sqlinject(target);
    ns.ftpcrack(target);
    ns.relaysmtp(target);

    ns.nuke(target);

    while(true) {
        if (ns.getServerSecurityLevel(target) > securityThresh) {
            await ns.weaken(target);
        } else if (ns.getServerMoneyAvailable(target) < moneyThresh) {
            await ns.grow(target);
        } else {
            await ns.hack(target);
        }
    }
}