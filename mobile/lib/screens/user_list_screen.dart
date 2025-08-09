import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../services/api_service.dart';
import '../models/user.dart';

class UserListScreen extends StatelessWidget {
  const UserListScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final ApiService apiService = ApiService();
    return Scaffold(
      appBar: AppBar(
        title: const Text('User List'),
        actions: [
          IconButton(
            icon: const Icon(Icons.history),
            tooltip: 'View All Attendance History',
            onPressed: () {
              Navigator.pushNamed(context, '/attendance_history');
            },
          ),
        ],
      ),
      body: FutureBuilder<List<User>>(
        future: apiService.getUsers(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(
              child: Text(
                'Error: ${snapshot.error}',
                style: const TextStyle(color: Colors.red),
              ),
            );
          } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
            return const Center(child: Text('No users found'));
          }
          final users = snapshot.data!;
          return ListView.builder(
            padding: const EdgeInsets.all(16),
            itemCount: users.length,
            itemBuilder: (context, index) {
              final user = users[index];
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
                      Navigator.pushNamed(
                        context,
                        '/mark_attendance',
                        arguments: user,
                      );
                    },
                    borderRadius: BorderRadius.circular(12),
                    child: ListTile(
                      leading: Icon(
                        user.role == 'intern' ? Icons.person : Icons.group,
                        color: Colors.blue,
                        size: 30,
                      ),
                      title: Text(
                        user.name,
                        style: Theme.of(context).textTheme.titleLarge,
                      ),
                      subtitle: Text(
                        'Role: ${user.role} | Email: ${user.email}',
                        style: Theme.of(context).textTheme.bodyMedium,
                      ),
                      trailing: IconButton(
                        icon: const Icon(Icons.history, color: Colors.blue),
                        tooltip: 'View Attendance History',
                        onPressed: () {
                          Navigator.pushNamed(
                            context,
                            '/attendance_history',
                            arguments: user.id,
                          );
                        },
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
