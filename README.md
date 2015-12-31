# playground-http-bench
HTTP perf testing.

## Hardware
2014 era MBP.

## Metrics
Running `wrk(1)` 12 threads, 4000 open connections for 10 seconds. Longer
duration tests don't provide better metrics per se.

## Usage
```sh
$ ./bench <port>  # defaults to 1337
```

## Results
### simple
```txt
Running 10s test @ http://localhost:1337
  24 threads and 4000 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    11.61ms    1.50ms  41.30ms   83.23%
    Req/Sec     2.82k     4.82k   19.01k    85.59%
  196895 requests in 10.10s, 20.84MB read
  Socket errors: connect 3757, read 0, write 0, timeout 0
Requests/sec:  19494.52
Transfer/sec:      2.06MB
```

### full with logging and api disabled
```txt
Running 10s test @ http://localhost:1337
  24 threads and 4000 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency   108.22ms   15.23ms 296.70ms   81.44%
    Req/Sec   240.39    349.32     1.75k    88.80%
  20938 requests in 10.10s, 2.58MB read
  Socket errors: connect 3757, read 13, write 0, timeout 0
Requests/sec:   2072.28
Transfer/sec:    261.06KB
```

### full with everything enalbed
straight up dies

## License
[MIT](https://tldrlegal.com/license/mit-license)
