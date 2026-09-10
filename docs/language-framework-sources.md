# 语言与框架：选题来源与版本边界

核验日期：2026-09-09。

本习题册以 Java、Python、Go 的基础知识、核心机制与 Web 开发为范围。题目为本站原创整理，只呈现问题，不附答案；第一方文档用于核对概念和限定条件，不代表企业真题，也不证明任何统计意义上的面试频率。难度是本站复习分级。

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
