import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:intl/intl.dart';
import '../services/api_service.dart';
import '../models/attendance.dart';
import '../models/user.dart';

class AttendanceHistoryScreen extends StatelessWidget {
  final int? userId;

  const AttendanceHistoryScreen({super.key, this.userId});

  @override
  Widget build(BuildContext context) {
    final ApiService apiService = ApiService();
    return Scaffold(
      appBar: AppBar(
        title: Text(
          userId != null ? 'User Attendance History' : 'All Attendance History',
        ),
      ),
      body: FutureBuilder<List<dynamic>>(
        future: Future.wait([
          userId != null
              ? apiService.getAttendanceHistory(userId!)
              : apiService.getAllAttendance(),
          apiService.getUsers(),
        ]),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(
              child: CircularProgressIndicator(color: Colors.blue),
            );
          } else if (snapshot.hasError) {
            return Center(
              child: Text(
                'Error: ${snapshot.error}',
                style: const TextStyle(color: Colors.red, fontSize: 16),
              ),
            );
          } else if (!snapshot.hasData || snapshot.data![0].isEmpty) {
            return const Center(
              child: Text(
                'No attendance records found',
                style: TextStyle(fontSize: 16),
              ),
            );
          }
          List<Attendance> attendanceRecords =
              snapshot.data![0] as List<Attendance>;
          final users = snapshot.data![1] as List<User>;
          final userMap = {for (var user in users) user.id: user.name};

          return ListView.builder(
            padding: const EdgeInsets.all(16),
            itemCount: attendanceRecords.length,
            itemBuilder: (context, index) {
              final record = attendanceRecords[index];
              String formattedDateTime = record.createdAt;
              try {
                final parsedDate = DateTime.parse(record.createdAt);
                final istDate = parsedDate.add(
                  const Duration(hours: 5, minutes: 30),
                );
                formattedDateTime = DateFormat(
                  "MMMM d, yyyy 'at' h:mm a",
                ).format(istDate);
              } catch (e) {
                formattedDateTime = 'Invalid date';
              }
              final userName =
                  userMap[record.userId] ?? 'User ID: ${record.userId}';
              return Animate(
                effects: [
                  FadeEffect(duration: 300.ms, delay: (index * 100).ms),
                  ScaleEffect(
                    begin: const Offset(0.95, 0.95),
                    end: const Offset(1, 1),
                    duration: 300.ms,
                  ),
                ],
                child: Card(
                  child: InkWell(
                    onTap: () {
                      // Optional: Add tap action later (e.g., show details)
                    },
                    borderRadius: BorderRadius.circular(12),
                    child: ListTile(
                      leading: CircleAvatar(
                        radius: 20,
                        backgroundColor: record.status == 'present'
                            ? Colors.green[100]
                            : Colors.red[100],
                        child: Icon(
                          record.status == 'present'
                              ? Icons.check_circle
                              : Icons.cancel,
                          color: record.status == 'present'
                              ? Colors.green
                              : Colors.red,
                        ),
                      ),
                      title: Text(
                        userName,
                        style: Theme.of(context).textTheme.titleLarge,
                      ),
                      subtitle: Text(
                        'Date: $formattedDateTime\nStatus: ${record.status.toUpperCase()}',
                        style: Theme.of(context).textTheme.bodyMedium,
                      ),
                    ),
                  ),
                ),
              );
            },
          );
        },
      ),
    );
  }
}
