 export async function POST(req: Request) {
    const payload = await req.text()
    const body = JSON.stringify(payload);
    let output = 'We currently do not have an answer for that';
    if (body.toLowerCase().includes('router') || body.toLowerCase().includes('modem') || body.toLowerCase().includes('switches') || body.toLowerCase().includes('switch') || body.toLowerCase().includes('routers')) {
        const routerResponses = [
          'Solution: Analyze traffic patterns, upgrade network switches, and implement Quality of Service (QoS) settings.',
          'Solution: Replace the faulty network devices, restore configurations, and monitor for recurring issues.',
          'Solution: Review and correct network settings, update firmware, and check routing tables.',

        ];
        output = routerResponses[Math.floor(Math.random() * routerResponses.length)];

    } 
      else if (body.toLowerCase().includes('server')){
        const serverResponses = [
            'Solution: Check server status lights, reboot if necessary, and review system logs for errors.',
            'Solution: Identify resource-hungry applications, optimize configurations, and consider hardware upgrades.',
            'Solution: Analyze crash logs, update drivers and firmware, and apply relevant patches.',
            'Solution: Archive or delete unnecessary files, monitor storage usage regularly, and consider storage expansion.',
            'Solution: Check network cables, switch ports, and server NIC settings. Update network drivers if needed.',
          ];
          output = serverResponses[Math.floor(Math.random() * serverResponses.length)];
      }
      else if (body.toLowerCase().includes('racks')){
        const racksResponses = [
            'Solution: Ensure proper ventilation, adjust HVAC settings, and consider additional cooling units.',
            'Solution: Use cable organizers, label cables, and regularly audit and update cable configurations.',
            'Solution: Balance power loads, use PDUs with monitoring capabilities, and plan for future power needs.',
          ];
          output = racksResponses[Math.floor(Math.random() * racksResponses.length)];
      }
      else if (body.toLowerCase().includes('firewall') || body.toLowerCase().includes('asa') || body.toLowerCase().includes('security')){
        const FirewallResponses = [
            'Solution: Review firewall rules, log files, and adjust rule priorities.',
            'Solution: Regularly update firewall firmware, apply security patches, and conduct security audits.',
            'Solution: Implement rate limiting, utilize DDoS protection services, and monitor traffic patterns.',
          ];
          output = FirewallResponses[Math.floor(Math.random() * FirewallResponses.length)];
      }
      else if (body.toLowerCase().includes('ups') || body.toLowerCase().includes('pdu')){
        const UPSResponses = [
            'Solution: Replace the battery, perform regular battery tests, and monitor battery health.',
            'Solution: Distribute power loads evenly, consider additional UPS units, and monitor power usage.',
            'Solution: Check power input, replace faulty components, and test the UPS in bypass mode.',
          ];
          output = UPSResponses[Math.floor(Math.random() * UPSResponses.length)];
      }

      else if (body.toLowerCase().includes('cooling')){
        const CoolingResponses = [
            'Solution: Ensure proper HVAC functionality, clean air filters, and consider additional cooling solutions.',
            'Solution: Replace faulty fans promptly, monitor fan health regularly, and consider redundancy in critical areas.',
            'Solution: Reorganize equipment for better airflow, use blanking panels, and adjust HVAC settings.',
            'Solution: Identify and repair leaks, monitor for further issues, and consider regular maintenance checks.',
          ];
          output = CoolingResponses[Math.floor(Math.random() * CoolingResponses.length)];
      }
      else if (body.toLowerCase().includes('backup')){
        const BackupResponses = [
            'Solution: Check backup logs for errors, verify storage availability, and troubleshoot connectivity issues.',
            'Solution: Optimize network settings, compress data before backup, and consider upgrading backup hardware.',
            'Solution: Review backup schedules, ensure adequate storage space, and validate backup integrity regularly.',
            'Solution: Use reliable backup software, perform regular integrity checks, and test restores periodically.',
            'Solution: Implement a storage retention policy, archive old backups, and consider expanding storage capacity.',
          ];
          output = BackupResponses[Math.floor(Math.random() * BackupResponses.length)];
      }
      else if (body.toLowerCase().includes('storage')){
        const BackupResponses = [
            'Solution: Replace the failed drive, rebuild RAID if applicable, and monitor the health of all drives.',
            'Solution: Optimize storage I/O, distribute workloads evenly, and consider upgrading to faster storage solutions.',
            'Solution: Check network connectivity, review storage configurations, and update firmware and drivers.',
            'Solution: Replace the faulty controller, restore configurations, and ensure firmware is up to date.',
            'Solution: Implement storage quotas, archive or delete unnecessary data, and plan for storage expansion.',
          ];
          output = BackupResponses[Math.floor(Math.random() * BackupResponses.length)];
      }
      else if (body.toLowerCase().includes('kvm') || body.toLowerCase().includes('keyboard') || body.toLowerCase().includes('mouse') || body.toLowerCase().includes('bluetooth')){
        const KVMResponses = [
            'Solution: Check cable connections, replace faulty peripherals, and update KVM firmware if available.',
            'Solution: Verify video cable connections, check display settings, and update graphics drivers.',
            'Solution: Power cycle the KVM switch, check for firmware updates, and review configuration settings.',
            'Solution: Check USB connections, use compatible USB devices, and update KVM switch firmware.',
          ];
          output = KVMResponses[Math.floor(Math.random() * KVMResponses.length)];
      }
    return new Response(`${output}`, { status: 200 })
 }
