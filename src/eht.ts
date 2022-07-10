/**
* @param {NS} ns
**/
import { NS } from '@ns'

export async function main(ns: NS): Promise<void> {
    const target = ns.args[0];
    const moneyThresh = ns.getServerMaxMoney(target) * 0.75;
    const securityThresh = ns.getServerMinSecurityLevel(target) + 5;
    const initialPortsRequired = ns.getServerNumPortsRequired(target);
    if (ns.fileExists("BruteSSH.exe", "home")) {
        for(let i = 0; i < initialPortsRequired; i++) {
            ns.brutessh(target);
        }
    }
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