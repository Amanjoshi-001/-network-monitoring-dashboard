import psutil
import time
from ping3 import ping

last_sent = psutil.net_io_counters().bytes_sent
last_recv = psutil.net_io_counters().bytes_recv
last_time = time.time()


def get_connectivity():
    response = ping("8.8.8.8", timeout=1)
    return 100 if response else 0


def get_latency():
    response = ping("8.8.8.8", timeout=1)
    if response:
        return round(response * 1000, 2)
    return None


def get_bandwidth_usage():
    global last_sent, last_recv, last_time

    current = psutil.net_io_counters()
    current_time = time.time()

    sent = current.bytes_sent
    recv = current.bytes_recv

    sent_speed = sent - last_sent
    recv_speed = recv - last_recv

    speed = (sent_speed + recv_speed) / 1024  # KB/s

    last_sent = sent
    last_recv = recv
    last_time = current_time

    return round(speed, 2)


def get_network_stats():

    return {
        "connectivity": get_connectivity(),
        "latency": get_latency(),
        "bandwidth": get_bandwidth_usage()
    }
