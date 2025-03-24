## Module

Trong NestJS, module giống như một cách tổ chức code của bạn thành những "khối" riêng biệt, mỗi khối chịu trách nhiệm cho một phần chức năng cụ thể của ứng dụng. Nếu bạn đã dùng Express.js, hãy nghĩ về module như cách bạn chia nhỏ ứng dụng thành các file route riêng (ví dụ: userRoutes.js, productRoutes.js), nhưng trong NestJS, nó được nâng cấp lên một cấp độ có tổ chức và mạnh mẽ hơn.

controllers: Nơi xử lý các HTTP request (giống như các route trong Express).
providers: Các service hoặc class chứa logic chính (giống middleware hoặc logic xử lý trong Express).
imports: Nếu module này cần dùng chức năng từ module khác, bạn import vào đây.
exports: Nếu module này muốn chia sẻ service hoặc logic cho module khác dùng.

## Controller

Controller thường:
Nhận request từ client.
Gọi đến service để xử lý logic nghiệp vụ.
Trả về response (kết quả) cho client.

```
import { Controller, Get } from '@nestjs/common';

@Controller('users') // Định nghĩa prefix cho route, giống như "/users" trong Express
export class UsersController {
  @Get() // Xử lý GET request tới "/users"
  getUsers() {
    return 'Danh sách người dùng';
  }
}
```

## Service

Thông thường, controller không chứa logic phức tạp (giống như trong Express, chúng ta không nên viết hết logic vào route handler). Thay vào đó, controller gọi đến service để xử lý.

```

import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {} // Dependency Injection

  @Get()
  getUsers() {
    return this.usersService.getAllUsers(); // Gọi service để lấy dữ liệu
  }
}

```

## Decorator

Decorator giống như "nhãn dán" giúp NestJS hiểu code của bạn làm gì mà không cần viết logic lặp đi lặp lại.
Nó là tính năng của TypeScript, không có trong JavaScript thuần.

NestJS dùng decorator để định nghĩa hành vi của code:

@Controller('ninjas'): Báo cho NestJS rằng class này là một controller với tiền tố route /ninjas.
@Get(): Báo rằng method này xử lý HTTP GET request.
@Injectable(): Báo rằng class này có thể được inject vào nơi khác.

## Inject

Inject (tiêm) là hành động đưa một dependency (phụ thuộc) vào một class hoặc đối tượng để nó có thể sử dụng mà không cần tự tạo thủ công. Trong NestJS, "inject" thường liên quan đến Dependency Injection, nhưng mình sẽ giải thích riêng để rõ hơn.

**NestJS tự động "inject" các service vào controller qua constructor, nhờ decorator @Injectable() và hệ thống Dependency Injection.**

## Dependency injection

Dependency Injection (Tiêm phụ thuộc) là một design pattern (mô hình thiết kế) trong lập trình, nơi các dependency (phụ thuộc) của một class không được tạo bên trong class đó, mà được "tiêm" từ bên ngoài. Điều này giúp code dễ bảo trì, dễ test, và linh hoạt hơn.

> Cách NestJS làm DI:

> Đăng ký provider: Khi bạn đánh dấu NinjasService bằng @Injectable(), NestJS biết đây là một dependency có thể được inject.

> Tự động inject: Khi NinjasController cần NinjasService, NestJS tự tìm và cung cấp instance của NinjasService.

> Quản lý scope: NestJS đảm bảo mỗi dependency chỉ tạo một lần (singleton) trong scope mặc định, trừ khi bạn cấu hình khác.

## NotFoundException

Auto define the message error and return the message error and id like 400, 401 , 403 ....

## Guards

Guards trong NestJS là một cơ chế dùng để kiểm soát quyền truy cập vào các route hoặc method trong controller. Nó quyết định liệu một request có được phép tiếp tục xử lý hay không, dựa trên các điều kiện bạn đặt ra (như người dùng có đăng nhập không, có vai trò phù hợp không).

## Pipes: "Cầu nối" xử lý dữ liệu trước khi vào logic chính, tích hợp validation và transformation.

Pipes chạy sau Guards trong pipeline của NestJS.

ipes trong NestJS là một cơ chế để xử lý và biến đổi dữ liệu đầu vào trước khi nó được truyền vào controller. Pipe có thể:

Xác thực (validation): Kiểm tra dữ liệu có hợp lệ không.
Chuyển đổi (transformation): Biến đổi dữ liệu thành định dạng mong muốn.
Ý nghĩa:
Pipe giống như middleware trong Express, nhưng chuyên dụng hơn, hoạt động ở mức tham số của method (như @Body(), @Param()).
NestJS cung cấp các pipe sẵn có (như ValidationPipe) và bạn cũng có thể tự tạo pipe.
