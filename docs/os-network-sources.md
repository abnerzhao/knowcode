# 操作系统与网络：选题来源

核验日期：2026-09-09。

本册为原创面试自测问题，仅提供问题，不提供答案、提示或解题模板。操作系统、Linux 常用命令、计算机网络各 20 题；每部分覆盖基础知识与面试考点。“面试考点”是本站选题分类，不代表企业真题、出现次数统计或频率排名。

## 来源使用原则

- 以 Linux 内核文档、项目上游手册、GNU 官方手册和 IETF RFC 为技术依据，不复刻二手面经。
- Linux man-pages 项目维护接口文档；man7 上的 systemd、procps-ng、iproute2、tcpdump 页面是对应项目上游手册的 HTML 收录，不是面经文章。
- 题目中文表述为原创，链接用于核对知识范围；仅把问题正文展示给练习者，来源信息由已有参考链接入口承载。
- 官网滚动手册不等于用户机器版本。命令题以 GNU/Linux 为前提，不能默认与 macOS/BSD 或所有发行版参数相同。

## 操作系统

| 来源 | 用途 |
| --- | --- |
| [fork(2)](https://man7.org/linux/man-pages/man2/fork.2.html) | 进程创建、继承关系与写时复制 |
| [syscalls(2)](https://man7.org/linux/man-pages/man2/syscalls.2.html) | 系统调用与库包装函数的边界 |
| [unix(7)](https://man7.org/linux/man-pages/man7/unix.7.html) | 本机进程间 socket 通信 |
| [pthreads(7)](https://man7.org/linux/man-pages/man7/pthreads.7.html) | 线程共享资源、独有状态与 Linux 线程实现 |
| [sched(7)](https://man7.org/linux/man-pages/man7/sched.7.html) | 调度策略、优先级与抢占 |
| [EEVDF Scheduler](https://docs.kernel.org/scheduler/sched-eevdf.html) | 现代 Linux 公平调度的版本边界 |
| [Memory management concepts](https://docs.kernel.org/admin-guide/mm/concepts.html) | 虚拟内存、页表、缺页、回收与页缓存 |
| [mmap(2)](https://man7.org/linux/man-pages/man2/mmap.2.html) | 文件映射、共享与私有映射 |
| [pipe(7)](https://man7.org/linux/man-pages/man7/pipe.7.html) | 管道、阻塞、容量与原子写边界 |
| [futex(7)](https://man7.org/linux/man-pages/man7/futex.7.html) | 用户态同步与内核等待 |
| [signal(7)](https://man7.org/linux/man-pages/man7/signal.7.html) | 信号处理、屏蔽与不可捕获信号 |
| [wait(2)](https://man7.org/linux/man-pages/man2/wait.2.html) | 子进程回收与僵尸进程 |
| [inode(7)](https://man7.org/linux/man-pages/man7/inode.7.html) | inode、文件类型与文件属性 |
| [unlink(2)](https://man7.org/linux/man-pages/man2/unlink.2.html) | 文件名删除与仍被打开的文件 |
| [fsync(2)](https://man7.org/linux/man-pages/man2/fsync.2.html) | 缓冲写入、持久化及目录项边界 |
| [epoll(7)](https://man7.org/linux/man-pages/man7/epoll.7.html) | I/O 就绪通知、LT/ET 与事件处理 |

编写边界：不能把 CFS 写成所有当前 Linux 版本唯一的公平调度实现；不能把缺页等同于磁盘读取；不能把就绪通知等同于异步 I/O 完成；不能把文件 `write` 成功或 `close` 成功视为断电持久化承诺。ET 题需说明非阻塞处理与读写耗尽的关系，不能无条件承诺“epoll 所有操作 O(1)”。这些边界分别见上述内核内存、调度、fsync 与 epoll 文档。

Linux man-pages 页面本次读取标识为 6.18；具体系统调用历史与版本限制以各页 VERSIONS/HISTORY/NOTES 为准，不把文档版本当作发行版内核版本。

## Linux 常用命令

| 来源 | 用途 |
| --- | --- |
| [GNU Bash Reference Manual](https://www.gnu.org/software/bash/manual/bash.html) | 引号、展开、重定向、管道、退出码、作业控制 |
| [Bash Pipelines](https://www.gnu.org/software/bash/manual/html_node/Pipelines) | 管道子 shell、最后命令退出状态与 pipefail |
| [GNU Coreutils](https://www.gnu.org/software/coreutils/manual/coreutils.html) | ls/cp/mv、head/tail、sort/uniq/wc、chmod/chown、df/du、ln |
| [GNU Grep](https://www.gnu.org/s/grep/manual/html_node/index.html) | 文本匹配、正则表达式与退出状态 |
| [GNU Findutils](https://www.gnu.org/software/findutils/manual/html_mono/find.html) | 按名称、时间、类型、大小搜索文件与 xargs |
| [Safe File Name Handling](https://www.gnu.org/software/findutils/manual/html_node/find_html/Safe-File-Name-Handling.html) | 空格、换行文件名与 NUL 分隔 |
| [The GNU Awk User’s Guide](https://www.gnu.org/software/gawk/manual/gawk.html) | 记录、字段、过滤与聚合统计 |
| [ps(1)](https://man7.org/linux/man-pages/man1/ps.1.html) / [top(1)](https://man7.org/linux/man-pages/man1/top.1.html) | 进程、线程、CPU、内存观察 |
| [systemctl(1)](https://man7.org/linux/man-pages/man1/systemctl.1.html) / [journalctl(1)](https://man7.org/linux/man-pages/man1/journalctl.1.html) | 服务状态、启动与使能差别、日志筛选 |
| [ip(8)](https://man7.org/linux/man-pages/man8/ip.8.html) / [ss(8)](https://man7.org/linux/man-pages/man8/ss.8.html) | 地址、路由、邻居表、监听端口及连接状态 |
| [curl man page](https://curl.se/docs/manpage.html) | HTTP 请求、响应头、超时、连接与各阶段耗时 |
| [tcpdump(8)](https://man7.org/linux/man-pages/man8/tcpdump.8.html) | 按接口与过滤表达式抓包及保存分析 |

本次页面版本：Bash 5.3、Coreutils 9.11、Grep 3.12、Gawk 手册 5.4、Findutils 滚动手册 4.10.0.77-733bb、curl 8.22.1。systemd 的 man7 收录来自 2026-05-24 上游，标识 261~rc1；这不是要求用户安装预发布版本，题目只采用常见稳定概念。

编写边界：`uniq` 的相邻去重不能等同于任意行全局去重；`find` 的按天条件有取整边界；空白分隔的文件名处理会误伤含空格或换行的路径；`pipefail` 为 Bash 语义，不能默认所有 shell 相同；`systemctl enable` 不等同于立即启动；`df` 与 `du` 的统计对象不同；`curl` 收到 HTTP 错误响应与进程退出失败不天然等价。相关题目只询问差异与判断方法，不预先给命令答案。

抓取情况：GNU 部分长手册直接打开曾超时，但搜索返回了官方页面及正文，替代节点页可读；systemd 官网返回 403，tcpdump 官网未能抓取，故使用 man7 明确注明上游来源的手册。没有用非官方博客填补技术结论。

## 计算机网络

| 来源 | 用途 |
| --- | --- |
| [RFC 826](https://www.rfc-editor.org/rfc/rfc826.html) | 以太网地址解析与下一跳 |
| [RFC 8200](https://www.rfc-editor.org/rfc/rfc8200.html) | IPv6 与分片等边界 |
| [RFC 9293 — TCP](https://www.rfc-editor.org/rfc/rfc9293.html) | 字节流、连接建立关闭、序号、确认与流量控制 |
| [RFC 1034 — DNS concepts](https://www.rfc-editor.org/rfc/rfc1034.html) | DNS 名称层级、解析、递归与缓存 |
| [RFC 7766 — DNS over TCP](https://www.rfc-editor.org/rfc/rfc7766.html) | DNS 的 TCP 支持与“DNS 只用 UDP”误区 |
| [RFC 9110 — HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110.html) | 方法、幂等性、状态码、条件请求与代理语义 |
| [RFC 9113 — HTTP/2](https://www.rfc-editor.org/rfc/rfc9113.html) | 多路复用、流与 TCP 层队头阻塞 |
| [RFC 8446 — TLS 1.3](https://www.rfc-editor.org/rfc/rfc8446.html) | 握手、身份验证与 0-RTT 边界 |
| [RFC 9000 — QUIC](https://www.rfc-editor.org/rfc/rfc9000.html) | 基于 UDP 的可靠多路传输与连接迁移 |
| [RFC 9114 — HTTP/3](https://www.rfc-editor.org/rfc/rfc9114.html) | HTTP 到 QUIC 的映射 |

版本边界：TCP 使用 RFC 9293（2022，替代 RFC 793）；HTTP 语义与 HTTP/2 使用 2022 年 RFC 9110/9113；TLS 题显式标注 1.3（RFC 8446，2018），不混用 TLS 1.2 的报文顺序；QUIC/HTTP/3 分别使用 2021/2022 年的 RFC 9000/9114。

编写边界：TCP 是有序字节流，没有应用消息边界；关闭报文可合并，不宜把每次关闭都断言为严格四个数据包；TIME_WAIT 不固定属于客户端；DNS 不是仅有 UDP；HTTP/2 没有消除 TCP 层队头阻塞；QUIC 基于 UDP 不表示应用只能获得不可靠传输；TLS 1.3 的 0-RTT 不能被描述为天然防重放。网络排查题应区分解析、连接、TLS、应用响应阶段，不把 ping 成功等同于业务正常。

## 维护约定

官方来源用于校验概念和问题前提，不能证明某问题在面试中的出现频率。命令环境、内核版本或协议版本影响答案时，必须在题目中限定范围。来源文档中的示例和说明不直接拷贝进问题正文。

## 题库定稿补充核验

以下精确链接补足已编写题目的依据，与上表合并使用。

| 来源 | 用途与边界 |
| --- | --- |
| [open(2)](https://man7.org/linux/man-pages/man2/open.2.html) | 文件描述符与打开文件描述的区别；`O_DIRECT` 不能被当作持久化保证 |
| [sendfile(2)](https://man7.org/linux/man-pages/man2/sendfile.2.html) | 内核内数据传递与零拷贝；不能暗示任何硬件和调用路径都完全没有拷贝 |
| [malloc(3)](https://man7.org/linux/man-pages/man3/malloc.3.html) | 分配器与系统内存关系；分配成功不等于物理内存立即全部兑现 |
| [namespaces(7)](https://man7.org/linux/man-pages/man7/namespaces.7.html) | 资源视图隔离，与资源配额控制不同 |
| [Control Group v2](https://docs.kernel.org/admin-guide/cgroup-v2.html) | CPU、内存、I/O 控制与容器资源限制；显式限定 v2 |
| [Linux kernel memory barriers](https://docs.kernel.org/core-api/wrappers/memory-barriers.html) | 并发、重排、屏障与内核内存模型；不能把内核 API 直接当成 Java/C++ 用户态语言规则 |
| [pthread_mutex_lock(3p)](https://man7.org/linux/man-pages/man3/pthread_mutex_lock.3p.html) | 互斥、死锁风险、锁类型与错误边界；该页为 POSIX 手册，不等于所有 Linux 扩展 |
| [free(1)](https://man7.org/linux/man-pages/man1/free.1.html) | free、available 与缓存；空闲少不等于可用内存耗尽 |
| [iostat(1)](https://man7.org/linux/man-pages/man1/iostat.1.html) | sysstat 上游手册，设备 I/O 指标与采样区间；首份统计通常从启动累计 |
| [pidstat(1)](https://man7.org/linux/man-pages/man1/pidstat.1.html) | sysstat 上游手册，按任务观察 CPU、内存、I/O 与上下文切换 |
| [GNU tar 1.35](https://www.gnu.org/software/tar/manual/tar.html) | 归档、压缩与查看内容；不能把 tar 归档本身等同于压缩 |
| [RFC 1122 — Requirements for Internet Hosts](https://datatracker.ietf.org/doc/html/rfc1122) | 互联网分层、主机链路/IP/传输层基础；TCP 更新由 RFC 9293 覆盖 |
| [RFC 5681 — TCP Congestion Control](https://www.rfc-editor.org/rfc/rfc5681.html) | 经典慢启动、拥塞避免、快重传与恢复；不能声称所有现代拥塞算法细节相同 |
| [RFC 9111 — HTTP Caching](https://www.rfc-editor.org/rfc/rfc9111.html) | 新鲜度、验证与缓存指令；no-cache 不等于 no-store |
| [RFC 1191 — Path MTU Discovery](https://www.rfc-editor.org/rfc/rfc1191.html) | IPv4 PMTUD、DF 与 ICMP；不能直接照搬为 IPv6 机制 |

本次补充的 man7 与内核文档均可读取。iostat/pidstat 页脚明确注明取自 sysstat 上游 Git（抓取日 2026-05-24，上游最近提交 2026-05-17）。RFC 1122 的 RFC Editor 页面触发限流，采用 IETF Datatracker 同一 RFC 正文；GNU tar 与 RFC 9111 直开未成功，官方搜索结果确认了文档、版本和相关正文。
