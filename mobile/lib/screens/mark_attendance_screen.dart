import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../models/user.dart';
import '../services/api_service.dart';

class MarkAttendanceScreen extends StatefulWidget {
  final User user;

  const MarkAttendanceScreen({super.key, required this.user});

  @override
  State<MarkAttendanceScreen> createState() => _MarkAttendanceScreenState();
}

class _MarkAttendanceScreenState extends State<MarkAttendanceScreen> {
  final ApiService apiService = ApiService();
  String? _status;
  String? _error;

  void _markAttendance(String status) async {
    try {
      await apiService.markAttendance(widget.user.id, status);
      if (!mounted) return;
      setState(() {
        _status = status;
        _error = null;
      });
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Row(
            children: [
              Icon(Icons.check_circle, color: Colors.white),
              const SizedBox(width: 8),
              Text(
                'Attendance marked: $status',
                style: const TextStyle(color: Colors.white),
              ),
            ],
          ),
          backgroundColor: Colors.green,
          behavior: SnackBarBehavior.floating,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
          duration: const Duration(seconds: 2),
        ),
      );
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _error = e.toString();
      });
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Row(
            children: [
              Icon(Icons.error, color: Colors.white),
              const SizedBox(width: 8),
              Text('Error: $e', style: const TextStyle(color: Colors.white)),
            ],
          ),
          backgroundColor: Colors.red,
          behavior: SnackBarBehavior.floating,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
          duration: const Duration(seconds: 3),
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final double screenWidth = MediaQuery.of(context).size.width;
    final double buttonPadding = screenWidth < 400
        ? 16.0
        : 32.0; // Smaller padding for narrow screens

    return Scaffold(
      appBar: AppBar(title: Text('Mark Attendance for ${widget.user.name}')),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Card(
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  CircleAvatar(
                    radius: 40,
                    backgroundColor: Colors.blue[100],
                    child: Text(
                      widget.user.name[0].toUpperCase(),
                      style: const TextStyle(fontSize: 32, color: Colors.blue),
                    ),
                  ).animate().fadeIn(duration: 500.ms),
                  const SizedBox(height: 16),
                  Text(
                    widget.user.name,
                    style: Theme.of(context).textTheme.titleLarge,
                  ),
                  Text(
                    'Role: ${widget.user.role}',
                    style: Theme.of(context).textTheme.bodyMedium,
                  ),
                  const SizedBox(height: 20),
                  if (_status != null)
                    Animate(
                      effects: [
                        FadeEffect(duration: 300.ms),
                        ScaleEffect(
                          begin: const Offset(0.95, 0.95),
                          end: const Offset(1, 1),
                        ),
                      ],
                      child: Text(
                        'Attendance marked: ${_status!.toUpperCase()}',
                        style: TextStyle(
                          color: Colors.green[700],
                          fontSize: 18,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ),
                  if (_error != null)
                    Animate(
                      effects: [
                        FadeEffect(duration: 300.ms),
                        ScaleEffect(
                          begin: const Offset(0.95, 0.95),
                          end: const Offset(1, 1),
                        ),
                      ],
                      child: Text(
                        'Error: $_error',
                        style: TextStyle(
                          color: Colors.red[700],
                          fontSize: 18,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ),
                  const SizedBox(height: 20),
                  Wrap(
                    spacing: 16.0,
                    runSpacing: 16.0,
                    alignment: WrapAlignment.center,
                    children: [
                      Animate(
                        effects: [
                          ScaleEffect(
                            begin: const Offset(1, 1),
                            end: const Offset(0.95, 0.95),
                            duration: 100.ms,
                            curve: Curves.easeInOut,
                          ),
                        ],
                        child: ElevatedButton(
                          onPressed: () => _markAttendance('present'),
                          style: ElevatedButton.styleFrom(
                            backgroundColor: Colors.green,
                            padding: EdgeInsets.symmetric(
                              horizontal: buttonPadding,
                              vertical: 16,
                            ),
                            minimumSize: const Size(
                              140,
                              0,
                            ), // Ensure buttons don't shrink too much
                          ),
                          child: const Row(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              Icon(Icons.check),
                              SizedBox(width: 8),
                              Text('Mark Present'),
                            ],
                          ),
                        ),
                      ),
                      Animate(
                        effects: [
                          ScaleEffect(
                            begin: const Offset(1, 1),
                            end: const Offset(0.95, 0.95),
                            duration: 100.ms,
                            curve: Curves.easeInOut,
                          ),
                        ],
                        child: ElevatedButton(
                          onPressed: () => _markAttendance('absent'),
                          style: ElevatedButton.styleFrom(
                            backgroundColor: Colors.red,
                            padding: EdgeInsets.symmetric(
                              horizontal: buttonPadding,
                              vertical: 16,
                            ),
                            minimumSize: const Size(
                              140,
                              0,
                            ), // Ensure buttons don't shrink too much
                          ),
                          child: const Row(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              Icon(Icons.close),
                              SizedBox(width: 8),
                              Text('Mark Absent'),
                            ],
                          ),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
