# User Flows

## Founder Flow

1. Founder visits landing page.
2. Founder clicks "Apply as Founder."
3. Founder creates account or logs in.
4. Founder completes project application.
5. System saves project as `submitted`.
6. AI analyzes project.
7. AI generates:
   - Role map
   - Readiness score
   - 30-day roadmap
8. Admin reviews project.
9. Admin approves or rejects project.
10. If approved, status moves to `roles_mapped` or `matching`.
11. Admin assigns builders.
12. Founder sees team and project page.
13. Project moves through the build pipeline.

## Builder Flow

1. Builder visits landing page.
2. Builder clicks "Join as Builder."
3. Builder creates account or logs in.
4. Builder completes profile.
5. Profile status becomes `pending`.
6. Admin reviews builder profile.
7. Admin approves or rejects builder.
8. If approved, builder becomes eligible for matching.
9. Admin assigns builder to project.
10. Builder sees assigned project.

## Admin Flow

1. Admin logs in.
2. Admin views dashboard.
3. Admin reviews pending projects.
4. Admin reviews AI analysis.
5. Admin approves or rejects project.
6. Admin reviews pending builders.
7. Admin approves or rejects builders.
8. Admin opens matching screen.
9. Admin reviews suggested builders.
10. Admin manually assigns builders.
11. Admin updates project status.
12. Admin tracks teams through prototype/demo day.

## Matching Flow

1. Project is approved.
2. AI role map identifies needed roles.
3. System compares builder profiles against role needs.
4. System creates suggested matches.
5. Admin reviews suggestions.
6. Admin assigns one or more builders.
7. Assigned builders appear on project page.
8. Missing roles remain visible until filled.

## Project Status Flow

1. Submitted
2. Under Review
3. Roles Mapped
4. Matching
5. Team Formed
6. Building
7. Prototype Ready
8. Presented / Demo Day
9. Archived
