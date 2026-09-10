# 语言与框架：选题来源与版本边界

语言与框架部分核验日期：2026-09-09；开发工具及 Java 内存与 GC 部分补充核验日期：2026-09-10。

本习题册包含 Java、Python、Go 的基础知识、核心机制与 Web 开发，以及开发工具和 Java 内存与 GC 排查。题目为本站原创整理，只呈现问题，不附答案；第一方文档用于核对概念和限定条件，不代表企业真题，也不证明任何统计意义上的面试频率。难度是本站复习分级。

## Java：Java SE 17

以 Java SE 17 为统一基础，不把后续版本新增特性混入该版本。

- [Java 17 语言规范](https://docs.oracle.com/javase/specs/jls/se17/html/index.html)：类型、装箱、泛型、重载/重写、异常、初始化、Lambda 等概念的正式定义。
- [JLS 17：线程与锁](https://docs.oracle.com/javase/specs/jls/se17/html/jls-17.html)：内存模型、同步关系、可见性与 final 字段语义。
- [JVMS 17：虚拟机结构](https://docs.oracle.com/javase/specs/jvms/se17/html/jvms-2.html)：运行时数据区、栈帧、堆、方法区和运行时常量池。
- [Object API](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Object.html)：equals/hashCode 契约及监视器方法。
- [HashMap API](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/HashMap.html)：容量、负载因子、遍历和同步边界。
- [ConcurrentHashMap API](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/concurrent/ConcurrentHashMap.html)：并发访问及复合操作接口。
- [ThreadPoolExecutor API](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/concurrent/ThreadPoolExecutor.html)：线程数、队列、拒绝策略和任务处理。
- [Java 17 GC 调优导论](https://docs.oracle.com/en/java/javase/17/gctuning/introduction-garbage-collection-tuning.html)：延迟、吞吐和内存之间的取舍。
- [并发包总览](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/concurrent/package-summary.html)：Executor、Future、CompletableFuture、并发集合与同步工具入口。
- [Stream 包总览](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/stream/package-summary.html)：流操作与执行约束。
- [JFR API](https://docs.oracle.com/en/java/javase/17/docs/api/jdk.jfr/jdk/jfr/package-summary.html)：事件记录与诊断入口。

编辑边界：JVM 规范不限定具体收集器或某个 HotSpot 对象布局；讨论这些实现细节时须明确实现和版本。线程安全容器的单次操作保障不可直接推导为任意业务操作组合的原子性。虚拟线程不属于 Java 17 题目的默认前提。

## Python：Python / CPython 3.13

- [数据模型](https://docs.python.org/3.13/reference/datamodel.html)：对象、可变性、特殊方法、迭代器、生成器和描述符。
- [执行模型](https://docs.python.org/3.13/reference/executionmodel.html)：名称绑定、作用域与闭包。
- [控制流与函数定义](https://docs.python.org/3.13/tutorial/controlflow.html)：参数传递、默认参数、位置/关键字参数等。
- [异常处理](https://docs.python.org/3.13/tutorial/errors.html)：异常传播、清理与异常链。
- [copy 模块](https://docs.python.org/3.13/library/copy.html)：赋值、浅拷贝和深拷贝的区别。
- [threading 模块](https://docs.python.org/3.13/library/threading.html)：线程、锁、GIL 和可选 free-threaded 构建的差异。
- [asyncio 协程与任务](https://docs.python.org/3.13/library/asyncio-task.html)：任务调度、等待、超时、取消和任务组。
- [Python 3.13 标准库索引](https://docs.python.org/3.13/library/index.html)：functools、typing、gc、concurrent.futures、contextvars 和分析工具等相关库的第一方检索入口。
- [CPython 3.13 实验性 free-threading](https://docs.python.org/3.13/howto/free-threading-python.html)：GIL 可选构建及扩展模块兼容边界。

编辑边界：GIL 题须明确 CPython 及构建类型；3.13 已提供实验性的可选 free-threaded 构建，不能写“Python 永远只能一个线程执行”。CPython 内存管理细节不等同语言规范。异步并发不意味着 CPU 密集任务自动获得多核并行。取消是协作过程，不应被描述为强杀。

## Go：语言规范与标准库

- [Go 语言规范](https://go.dev/ref/spec)：数组、切片、map、接口、方法集、defer、panic/recover、channel 和 select。
- [Effective Go](https://go.dev/doc/effective_go)：语言惯用法；该文不是最新特性的完整目录。
- [Go FAQ](https://go.dev/doc/faq)：接口值、指针、内存分配等易混淆问题。
- [Go 内存模型](https://go.dev/ref/mem)：同步关系及数据竞争的推理基础。
- [sync 包](https://pkg.go.dev/sync)：锁、WaitGroup、Once 和其他同步工具的契约。
- [context 包](https://pkg.go.dev/context)：取消、截止时间、请求级值与资源释放。
- [竞态检测器](https://go.dev/doc/articles/race_detector)：动态竞态检测的使用及覆盖边界。
- [Go GC 指南](https://go.dev/doc/gc-guide)：GC 成本、内存限制和性能观测。
- [net/http 包](https://pkg.go.dev/net/http)：Handler、请求上下文、Client、Transport 和 Server 生命周期。
- [Go 诊断指南](https://go.dev/doc/diagnostics)：profiling、tracing 和诊断工具入口。
- [Go 依赖管理](https://go.dev/doc/modules/managing-dependencies)：模块、依赖版本和管理流程。
- [Go 1.22 循环变量语义变更](https://go.dev/blog/loopvar-preview)：闭包捕获题的版本依据。
- [runtime 包](https://pkg.go.dev/runtime)：运行时控制、goroutine 与运行时统计入口。
- [errors 包](https://pkg.go.dev/errors)：错误包装链、Is、As 和 Join。

编辑边界：Go 规范和 pkg.go.dev 链接会跟随版本更新。闭包捕获循环变量题必须说明 Go 版本及变量声明形式，不照搬 Go 1.22 以前的结论。不要把切片扩容倍率、map 桶布局或 goroutine 调度参数当作跨版本语言保证。竞态检测未报告问题不等于证明不存在数据竞争。

## Java Web：Spring Framework 6.2 / Spring Boot 3.5

- [IoC 容器](https://docs.spring.io/spring-framework/reference/6.2/core/beans.html)：依赖注入、Bean 生命周期、作用域及扩展点。
- [AOP 代理机制](https://docs.spring.io/spring-framework/reference/6.2/core/aop/proxying.html)：JDK/CGLIB、方法可代理性与自调用边界。
- [声明式事务注解](https://docs.spring.io/spring-framework/reference/6.2/data-access/transaction/declarative/annotations.html)：事务代理、回滚规则和方法可见性。
- [DispatcherServlet](https://docs.spring.io/spring-framework/reference/6.2/web/webmvc/mvc-servlet.html)：MVC 请求分发流程。
- [Spring Boot 自动配置](https://docs.spring.io/spring-boot/3.5/reference/using/auto-configuration.html)：自动配置条件、回退与排查。
- [Spring Boot 外部配置](https://docs.spring.io/spring-boot/3.5/reference/features/external-config.html)：属性来源、覆盖顺序、绑定和环境差异。
- [Spring Security 6.5 Servlet 架构](https://docs.spring.io/spring-security/reference/6.5/servlet/architecture.html)：安全过滤器链与请求匹配。
- [Spring Security 6.5 CSRF](https://docs.spring.io/spring-security/reference/6.5/servlet/exploits/csrf.html)：跨站请求伪造防护与使用前提。
- [Spring Security 6.5 CORS](https://docs.spring.io/spring-security/reference/6.5/servlet/integrations/cors.html)：跨域预检与安全过滤器顺序。
- [Spring Boot 3.5 测试](https://docs.spring.io/spring-boot/3.5/reference/testing/index.html)：测试支持、切片和应用测试入口。

编辑边界：这些固定版本是习题前提，不声称它们是最新版本。代理自调用问题须注明默认 proxy 模式，不能推广到 AspectJ 编织。不要把 Spring Framework 和 Spring Boot 的默认代理配置混为一谈。单例作用域不保证业务 Bean 的线程安全。

## Python Web：Django 5.2 / FastAPI

- [Django 中间件](https://docs.djangoproject.com/en/5.2/topics/http/middleware/)：请求/响应处理顺序和短路。
- [Django 数据库访问优化](https://docs.djangoproject.com/en/5.2/topics/db/optimization/)：QuerySet 求值、缓存、关联查询和查询成本。
- [Django 数据库事务](https://docs.djangoproject.com/en/5.2/topics/db/transactions/)：autocommit、atomic 和请求事务边界。
- [Django 安全](https://docs.djangoproject.com/en/5.2/topics/security/)：CSRF、XSS、SQL 注入及框架保障的适用条件。
- [Django 部署](https://docs.djangoproject.com/en/5.2/howto/deployment/)：WSGI 与 ASGI 的部署入口。
- [Django 异步支持](https://docs.djangoproject.com/en/5.2/topics/async/)：异步视图、同步/异步适配与 ORM 支持边界。
- [FastAPI 并发与 async/await](https://fastapi.tiangolo.com/async/)：异步与同步路由、阻塞调用及线程池边界。
- [FastAPI 依赖注入](https://fastapi.tiangolo.com/tutorial/dependencies/)：依赖组合与请求所需资源。
- [FastAPI lifespan](https://fastapi.tiangolo.com/advanced/events/)：启动/关闭阶段共享资源的初始化和释放。
- [FastAPI 响应模型](https://fastapi.tiangolo.com/tutorial/response-model/)：输出校验、序列化与字段过滤。
- [FastAPI 后台任务](https://fastapi.tiangolo.com/tutorial/background-tasks/)：请求响应后的进程内任务与重型任务工具选型边界。

编辑边界：FastAPI 文档滚动更新，不虚构固定发行版本。不要将“定义为 async def”视为调用链非阻塞的充分条件。Django ORM 与安全中间件的保障依赖正确使用，不能笼统写为自动杜绝所有注入或跨站攻击。

## Go Web：Gin / net/http

- [Gin 中间件](https://gin-gonic.com/en/docs/middleware/)：全局、分组及单路由中间件链。
- [Gin 中间件中使用 goroutine](https://gin-gonic.com/en/docs/middleware/goroutines-inside-a-middleware/)：Context 复用与只读副本。
- [Gin 绑定和验证](https://gin-gonic.com/en/docs/binding/binding-and-validation/)：Bind/ShouldBind、校验失败与响应责任。
- [Gin 上下文与取消](https://gin-gonic.com/en/docs/server-config/context/)：请求 context 向下游传播及生命周期。
- [Gin 优雅退出](https://gin-gonic.com/en/docs/server-config/graceful-restart-or-stop/)：关闭信号、在途请求及 net/http Server 的协作。
- [net/http 标准库](https://pkg.go.dev/net/http)：HTTP 服务端及客户端超时、连接复用和关闭语义。

编辑边界：Gin 英文文档已采用 middleware、binding、server-config 等新目录，本次使用核验可读的新 URL。Gin Context 副本不是“允许后台 goroutine 随时写响应”的许可；请求取消与任务持久化是不同层次的问题。Gin 和 net/http 的能力应分别归属。

## 来源主机

全部使用 HTTPS 第一方技术文档：`docs.oracle.com`、`docs.python.org`、`go.dev`、`pkg.go.dev`、`docs.spring.io`、`docs.djangoproject.com`、`fastapi.tiangolo.com`、`gin-gonic.com`。

题库引用应逐题指向支持该考点的具体页面，不使用搜索结果页或泛化的官网首页。

## 题库细项补充来源

- [Java 17 · String](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/String.html)
- [Java 17 · 集合包](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/package-summary.html)
- [Java 17 · CompletableFuture](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/concurrent/CompletableFuture.html)
- [Java 17 · ThreadLocal](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/ThreadLocal.html)
- [Python 3.13 · 内置类型](https://docs.python.org/3.13/library/stdtypes.html)
- [Python 3.13 · 导入系统](https://docs.python.org/3.13/reference/import.html)
- [Python 3.13 · functools](https://docs.python.org/3.13/library/functools.html)
- [Python 3.13 · 类型注解](https://docs.python.org/3.13/library/typing.html)
- [Python 3.13 · 并发执行器](https://docs.python.org/3.13/library/concurrent.futures.html)
- [Python 3.13 · 垃圾回收](https://docs.python.org/3.13/library/gc.html)
- [Python 3.13 · 异步同步原语](https://docs.python.org/3.13/library/asyncio-sync.html)
- [Python 3.13 · 性能分析](https://docs.python.org/3.13/library/profile.html)
- [Python 3.13 · contextvars](https://docs.python.org/3.13/library/contextvars.html)

以上补充页面均于同日核验，用于对应题目的 API 契约与版本范围。

## 开发工具命令选题来源

核验日期：2026-09-10。用于「语言与框架」中新增的开发工具练习。只依据第一方文档选择命令使用、概念差异与排错问题；不宣称企业真题或统计意义上的高频题。网页中的命令示例未在本机或生产环境执行。

### Git

选题包含工作区与暂存区、提交与历史、远程协作、分支整合、暂存与提交迁移、撤销与恢复六题。`status`、`diff`、`add`、`commit`、`branch`、`merge`、`rebase`、`stash`、`remote`、`fetch`、`push`、`cherry-pick`、`bisect` 的入口见 [Git 命令参考](https://git-scm.com/docs)。

撤销题需要区分 [reset 对 HEAD、暂存区和工作区的影响](https://git-scm.com/docs/git-reset)，避免将清理工作区与生成反向提交混为一谈。恢复题应讨论 [reflog 的本地引用记录及过期机制](https://git-scm.com/docs/git-reflog)，不暗示它能恢复任意未保存或未追踪内容。

版本边界：以核验时 Git 官方参考为依据，学习时对照本机版本帮助；不依赖新版本独有参数。

### Docker

- 镜像构建、标签和启动参数：[Docker 命令参考](https://docs.docker.com/reference/)、[容器运行说明](https://docs.docker.com/engine/containers/run/)。
- 构建上下文与缓存失效：[构建缓存](https://docs.docker.com/build/cache/)。
- 数据持久化与容器删除的边界：[Volumes](https://docs.docker.com/engine/storage/volumes/)。
- 发布端口与监听地址：[端口映射](https://docs.docker.com/engine/network/port-publishing/)。
- 多服务启动、停止与配置检查：[Compose CLI](https://docs.docker.com/reference/cli/docker/compose/)。
- 进入运行中的容器及权限边界：[container exec](https://docs.docker.com/reference/cli/docker/container/exec/)。

版本边界：使用当前 `docker compose` 子命令形式，不把旧的 `docker-compose` 作为唯一命令。题目不将特权模式、挂载 Docker socket 或删除卷作为默认排错动作；不同宿主系统的网络行为不应作无条件等同。

### Maven

- 生命周期与插件目标、`package` / `install` / `deploy`：[构建生命周期](https://maven.apache.org/guides/introduction/introduction-to-the-lifecycle.html)。
- 依赖范围、传递依赖和依赖管理：[依赖机制](https://maven.apache.org/guides/introduction/introduction-to-dependency-mechanism.html)。
- 依赖冲突定位：[dependency:tree](https://maven.apache.org/plugins/maven-dependency-plugin/tree-mojo.html)。
- 多模块构建和 reactor：[多模块指南](https://maven.apache.org/guides/mini/guide-multiple-modules.html)。
- 环境配置激活与配置核查：[Build Profiles](https://maven.apache.org/guides/introduction/introduction-to-profiles.html)。
- 跳过测试的语义与构建环境一致性：[Surefire 跳过测试](https://maven.apache.org/surefire/maven-surefire-plugin/examples/skipping-tests.html)、[Maven Wrapper](https://maven.apache.org/tools/wrapper/)。

版本边界：区分 Maven 核心版本和插件版本；不把 Maven 4 专属规则当成 Maven 3 通用行为。`deploy` 是发布构件到远程仓库，不等同于把业务应用部署到服务器。跳过执行测试与跳过测试编译不可笼统等同。

### JDK 命令（固定 Java 17）

- 编译输出目录、classpath、`--release`：[javac](https://docs.oracle.com/en/java/javase/17/docs/specs/man/javac.html)。
- 主类、JAR 与源码启动方式：[java](https://docs.oracle.com/en/java/javase/17/docs/specs/man/java.html)。
- JAR 内容与入口：[jar](https://docs.oracle.com/en/java/javase/17/docs/specs/man/jar.html)。
- 字节码与依赖检查：[javap](https://docs.oracle.com/en/java/javase/17/docs/specs/man/javap.html)、[jdeps](https://docs.oracle.com/en/java/javase/17/docs/specs/man/jdeps.html)。
- 交互实验：[jshell](https://docs.oracle.com/en/java/javase/17/docs/specs/man/jshell.html)。
- 线程与内存诊断及采样风险：[jcmd](https://docs.oracle.com/en/java/javase/17/docs/specs/man/jcmd.html)、[jstack](https://docs.oracle.com/en/java/javase/17/docs/specs/man/jstack.html)、[jmap](https://docs.oracle.com/en/java/javase/17/docs/specs/man/jmap.html)。

版本边界：此组选题明确使用 Java 17 手册；实际工具依赖 JDK 发行版、版本及操作系统。`jcmd` 文档对各诊断命令分别给出影响级别，堆转储不可描述为无成本操作，也不应让练习直接针对生产进程执行。

### Go 工具链与 Modules

六组选题：构建运行、测试与竞态、格式化与静态检查、模块整理与下载、依赖更新与工具安装、多模块工作区及环境。`build`、`run`、`test`、`fmt`、`vet`、`env` 等语义见 [go 命令参考](https://pkg.go.dev/cmd/go)；`go.mod`、`go.sum`、`tidy`、`download`、`get`、`install`、`work` 见 [Go Modules Reference](https://go.dev/ref/mod)。

版本边界：模块题按 Go 1.18+ 的工作流表述。Go 1.18 起 `go get` 不再承担编译安装可执行程序的职责；区分依赖更新和 `go install package@version` 的工具安装，见 [官方迁移说明](https://go.dev/doc/go-get-install-deprecation)。不把 `go.sum` 简称为与其他生态完全等价的锁文件。

### Python / uv

- Python 解释器选择、`.python-version` 和 `uv python pin`：[Python versions](https://docs.astral.sh/uv/concepts/python-versions/)。
- 项目结构、添加移除依赖与运行命令：[Working on projects](https://docs.astral.sh/uv/guides/projects/)。
- `uv lock`、`uv sync`、`uv run`、`--locked` 与 `--frozen`：[Locking and syncing](https://docs.astral.sh/uv/concepts/projects/sync/)。
- `uv tool`、`uvx` 与项目环境的区别：[Using tools](https://docs.astral.sh/uv/guides/tools/)。
- 构建和发布职责：[Building and publishing a package](https://docs.astral.sh/uv/guides/package/)。
- pip 风格接口的兼容边界：[Compatibility with pip](https://docs.astral.sh/uv/pip/compatibility/)。

版本边界：uv 使用核验时官方文档，具体参数以安装版本为准；不把 `uv pip` 当成与 pip 完全相同的实现。锁定依赖、同步环境与升级依赖是不同问题；`uv run` 默认可执行锁定与同步，不能笼统描述为只启动程序。`uvx` 是 `uv tool run` 的别名，和项目内 `uv run` 的环境语义应分别出题。发布仅询问流程与认证边界，不执行发布。

### 链接校验域名

`git-scm.com`、`docs.docker.com`、`maven.apache.org`、`docs.oracle.com`、`go.dev`、`pkg.go.dev`、`docs.astral.sh`。

补充精确参考：[git diff](https://git-scm.com/docs/git-diff)、[git add](https://git-scm.com/docs/git-add)、[git fetch](https://git-scm.com/docs/git-fetch)、[git rebase](https://git-scm.com/docs/git-rebase)、[git stash](https://git-scm.com/docs/git-stash)、[Docker 构建上下文](https://docs.docker.com/build/concepts/context/)、[uv 环境选择](https://docs.astral.sh/uv/pip/environments/)。

## Java 内存、OOM 与 GC 选题来源

核验日期：2026-09-10。以下为原创纯问题的选题依据，不是答案、生产操作手册或企业真题统计。Java 工具、参数和收集器行为以 Java 17 / HotSpot 为边界；OpenJDK 源码使用 17u 维护分支，不以主线新版本行为替代 Java 17。Eclipse MAT、Docker 和 Kubernetes 使用核验时的官方文档。

### 十二个问题方向及来源

1. **OOM 分类与第一现场**：如何依据异常完整信息、退出方式和发生前的监控区分 Java 堆、元空间、本地资源不足与容器终止？哪些证据应优先保留？依据：[Oracle 内存泄漏排查](https://docs.oracle.com/en/java/javase/17/troubleshoot/troubleshooting-memory-leaks.html)、[Kubernetes 内存资源](https://kubernetes.io/docs/tasks/configure-pod-container/assign-memory-resource/)。
2. **Java heap space**：如何区分堆配置不足、瞬时大分配、积压和持续泄漏？增加堆之前如何评估资源边界与验证路径？依据：[Oracle 内存泄漏排查](https://docs.oracle.com/en/java/javase/17/troubleshoot/troubleshooting-memory-leaks.html)。
3. **Metaspace**：如何结合类加载数量、类加载器及卸载信息分析元空间持续增长？如何验证动态生成类或类加载器滞留的假设？依据：[Oracle 内存泄漏排查](https://docs.oracle.com/en/java/javase/17/troubleshoot/troubleshooting-memory-leaks.html)、[Java 17 诊断工具](https://docs.oracle.com/en/java/javase/17/troubleshoot/diagnostic-tools.html)。
4. **直接内存与本地内存**：堆使用稳定但 RSS 持续上升时怎样分解内存？NMT、缓冲池指标和操作系统证据各能证明什么、不能证明什么？依据：[Native Memory Tracking](https://docs.oracle.com/en/java/javase/17/vm/native-memory-tracking.html)、[ByteBuffer API](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/nio/ByteBuffer.html)、[OpenJDK 17u Bits.java](https://github.com/openjdk/jdk17u/blob/master/src/java.base/share/classes/java/nio/Bits.java)。
5. **无法创建本地线程**：如何区分线程数量失控、栈内存压力和操作系统或容器资源限制？需要哪些线程及限制信息？依据：[OpenJDK 17u JVM_StartThread 实现](https://github.com/openjdk/jdk17u/blob/master/src/hotspot/share/prims/jvm.cpp)、[Kubernetes PID 限制](https://kubernetes.io/docs/concepts/policy/pid-limiting/)。
6. **容器 OOMKilled 且没有 dump**：如何核对容器终止原因、内存限制与 JVM 总内存预算？只有退出码 137 是否足以定位根因？没有堆转储时如何继续调查？依据：[Kubernetes 内存资源及 OOMKilled 示例](https://kubernetes.io/docs/tasks/configure-pod-container/assign-memory-resource/)、[Docker 资源限制](https://docs.docker.com/engine/containers/resource_constraints/)。
7. **堆转储采集与 MAT**：采集前如何评估暂停、磁盘、权限和敏感数据风险？如何结合 shallow heap、retained heap、dominator tree 与 GC roots 验证保留关系？依据：[jcmd](https://docs.oracle.com/en/java/javase/17/docs/specs/man/jcmd.html)、[MAT shallow / retained heap](https://help.eclipse.org/latest/topic/org.eclipse.mat.ui.help/concepts/shallowretainedheap.html)、[MAT dominator tree](https://help.eclipse.org/latest/topic/org.eclipse.mat.ui.help/concepts/dominatortree.html)、[MAT GC roots](https://help.eclipse.org/latest/topic/org.eclipse.mat.ui.help/concepts/gcroots.html)。
8. **泄漏还是正常内存压力**：单张堆快照能否证明泄漏？如何在相近负载下对比回收后存活集、对象保留链和业务生命周期？依据：[Oracle 内存泄漏排查](https://docs.oracle.com/en/java/javase/17/troubleshoot/troubleshooting-memory-leaks.html)、[MAT retained heap](https://help.eclipse.org/latest/topic/org.eclipse.mat.ui.help/concepts/shallowretainedheap.html)。
9. **GC 日志分析**：Java 17 如何规划统一日志的级别、时间字段、轮转与保留？如何把回收原因、暂停、堆变化和请求延迟关联起来？依据：[java 命令的统一日志说明](https://docs.oracle.com/en/java/javase/17/docs/specs/man/java.html)。
10. **Full GC 频繁**：使用 G1 时如何区分分配压力、并发标记跟不上、疏散失败及显式触发？如何依据原因选择应用或配置层面的验证方案？依据：[G1 调优：Full GC](https://docs.oracle.com/en/java/javase/17/gctuning/garbage-first-garbage-collector-tuning.html)。
11. **G1 暂停与大对象**：如何分析暂停目标未满足、humongous 对象及连续区域分配问题？调整 region 或暂停目标后怎样验证吞吐、延迟与内存之间的取舍？依据：[G1 调优](https://docs.oracle.com/en/java/javase/17/gctuning/garbage-first-garbage-collector-tuning.html)。
12. **JFR 复盘与修复验证**：如何选择录制配置、范围和保留策略，并关联分配、GC、线程与业务事件？修复后如何设计可对比负载，确认收益且没有引入新风险？依据：[jcmd 的 JFR 命令](https://docs.oracle.com/en/java/javase/17/docs/specs/man/jcmd.html)、[jfr 文件分析命令](https://docs.oracle.com/en/java/javase/17/docs/specs/man/jfr.html)。

### 编辑边界

- **不是所有 OOM 都是泄漏**：堆不足、元空间限制或分配方式也可能导致失败；题目应要求验证而非预设结论。[Oracle 内存泄漏排查](https://docs.oracle.com/en/java/javase/17/troubleshoot/troubleshooting-memory-leaks.html)
- **NMT 不是完整进程内存账本**：Java 17 手册明确限定其覆盖范围、默认关闭和启动时开启要求；官方提示启用可能带来 5%–10% 性能开销，实际影响仍需测试。不可假定事后开启能补回历史数据。[NMT](https://docs.oracle.com/en/java/javase/17/vm/native-memory-tracking.html)
- **dump 不是免费或必然存在的证据**：`GC.heap_dump` 标记为高影响，默认会请求 Full GC，`-all` 改变这一行为；转储可能含应用数据，应作为受控诊断材料。自动转储开关不能保证外部 OOM kill 后仍留下文件。[jcmd](https://docs.oracle.com/en/java/javase/17/docs/specs/man/jcmd.html)、[自动转储参数](https://docs.oracle.com/en/java/javase/17/docs/specs/man/java.html)、[容器内存限制](https://docs.docker.com/engine/containers/resource_constraints/)
- **无 dump 的处理是证据降级**：结合上述文档推导，题目应允许使用已有日志、监控、终止状态和重现结果继续缩小范围，而非凭空恢复已终止进程的堆；退出码 137 应结合 OOMKilled 状态、节点和内核信息确认，不能单独证明 JVM 堆溢出。
- **GC 调优需固定收集器**：G1 相关问题不套用到任意收集器，暂停目标不是严格的实时保证；不输出通用参数配方。[G1 调优](https://docs.oracle.com/en/java/javase/17/gctuning/garbage-first-garbage-collector-tuning.html)
- **JFR 也有开销边界**：默认和 profile 配置收集量不同；GC roots 路径采集可能暂停应用。复盘只能分析已录制的信息，不能补出未发生录制的历史事件。[jcmd 的 JFR 说明](https://docs.oracle.com/en/java/javase/17/docs/specs/man/jcmd.html)

精确来源域名：`docs.oracle.com`、`github.com`、`help.eclipse.org`、`kubernetes.io`、`docs.docker.com`。源码原文读取使用 OpenJDK 官方仓库的 `raw.githubusercontent.com`，题目参考链接可保留对应 GitHub 页面。
